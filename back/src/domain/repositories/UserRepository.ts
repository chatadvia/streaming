import prisma from '../../shared/utils/prismaClient';
import { UpdateUserDTO } from '../../application/dtos/UserDTO';
import { User } from '../entities/User';

export class UserRepository {
  public async save(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return this.toDomain(newUser);
  }

  public async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        ratings: true,
      },
    });
    return users.map(this.toDomain);
  }

  public async findById(id: any): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return user ? this.toDomain(user) : null;
  }

  public async update(id: any, userDTO: UpdateUserDTO): Promise<User | null> {
    if (userDTO.email) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: userDTO.email },
      });
  
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new Error('Email já está em uso por outro usuário');
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: userDTO.name,
        email: userDTO.email,
        password: userDTO.password,
        role: userDTO.role,
        active: userDTO.active,
        updatedAt: new Date(),
      },
    });
  
    return this.toDomain(updatedUser);
  }
  
  public async deactivate(id: any): Promise<void> {
    await prisma.user.update({
      where: { id: id },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });
  }

  public async activate(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        active: true,
        updatedAt: new Date(),
      },
    });
  }  

  private toDomain(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.active,
      user.createdAt,
      user.updatedAt,
      user.ratings
    );
  }
}
