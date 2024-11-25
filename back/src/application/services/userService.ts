import { checkIfAdmin } from "../../shared/utils/checkIfAdmin";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/UserDTO";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import bcrypt from 'bcryptjs';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userDTO: CreateUserDTO, userId: any): Promise<User> {
    const isAdmin = await checkIfAdmin(userId, this.userRepository);

    if (!isAdmin) {
      throw new Error('Somente administradores podem cadastrar usuários');
    }
    const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);

    const newUser = new User(
      '0',
      userDTO.name,
      userDTO.email,
      hashedPassword,
      userDTO.role,
      true, 
      new Date(),
      new Date() 
    );

    return await this.userRepository.save(newUser);
  }
  
  public async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Filme não encontrado');
    }
    return user;
  }

  public async editUser(userId: string, userDTO: UpdateUserDTO): Promise<User | null> {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    existingUser.name = userDTO.name || existingUser.name;
    existingUser.email = userDTO.email || existingUser.email;
    existingUser.password = userDTO.password || existingUser.password;
    existingUser.role = userDTO.role || existingUser.role;

    if (userDTO.password) {
      existingUser.password = await bcrypt.hash(userDTO.password, saltRounds);
    }

    return await this.userRepository.update(userId, existingUser);
  }

  public async deactivateUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await this.userRepository.deactivate(userId);
  }

  public async activateUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    if (user.active) {
      throw new Error('O usuário já está ativo');
    }
  
    await this.userRepository.activate(userId);
  }
  
}

export { UserService };
