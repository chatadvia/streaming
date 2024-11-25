// import bcrypt from 'bcryptjs';
// import { UserService } from '../../../domain/services/userService';
// import { UserRepository } from '../../../domain/repositories/UserRepository';
// import { User } from '../../../domain/entities/User';
// import { CreateUserDTO, UpdateUserDTO } from '../../../domain/dtos/UserDTO';

// jest.mock('../repositories/UserRepository');
// jest.mock('bcryptjs');

// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: UserRepository;

//   beforeEach(() => {
//     userRepository = new UserRepository();
//     userService = new UserService(userRepository);
//   });

//   describe('checkIfAdmin', () => {
//     it('should return true if user is an admin', async () => {
//       const user = new User(1, 'John Doe', 'john@example.com', 'hashedPassword', 'ADMIN', true, new Date(), new Date());
//       jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

//       const result = await userService.checkIfAdmin(1);

//       expect(result).toBe(true);
//       expect(userRepository.findById).toHaveBeenCalledWith(1);
//     });

//     it('should throw an error if user is not found', async () => {
//       jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

//       await expect(userService.checkIfAdmin(1)).rejects.toThrowError('Usuário não encontrado');
//     });
//   });

//   describe('createUser', () => {
//     it('should create a user if admin', async () => {
//       const userDTO: CreateUserDTO = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'password',
//         role: 'USER',
//       };

//       const hashedPassword = 'hashedPassword';
//       jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
//       const newUser = new User(1, userDTO.name, userDTO.email, hashedPassword, userDTO.role, true, new Date(), new Date());

//       jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

//       const result = await userService.createUser(userDTO, true);

//       expect(result).toEqual(newUser);
//       expect(bcrypt.hash).toHaveBeenCalledWith(userDTO.password, expect.any(Number));
//       expect(userRepository.save).toHaveBeenCalledWith(newUser);
//     });

//     it('should throw an error if not admin', async () => {
//       const userDTO: CreateUserDTO = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'password',
//         role: 'USER',
//       };

//       await expect(userService.createUser(userDTO, false)).rejects.toThrowError('Somente administradores podem cadastrar usuários');
//     });
//   });

//   describe('editUser', () => {
//     it('should edit an existing user', async () => {
//       const userDTO: UpdateUserDTO = {
//         name: 'Updated Name',
//         email: 'updated@example.com',
//         password: 'newpassword',
//         role: 'USER',
//       };

//       const existingUser = new User(1, 'John Doe', 'john@example.com', 'hashedPassword', 'USER', true, new Date(), new Date());
//       jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser);
//       jest.spyOn(bcrypt, 'hash').mockResolvedValue('newHashedPassword');
//       jest.spyOn(userRepository, 'update').mockResolvedValue(existingUser);

//       const result = await userService.editUser(1, userDTO);

//       expect(result).toEqual(existingUser);
//       expect(bcrypt.hash).toHaveBeenCalledWith(userDTO.password, expect.any(Number));
//       expect(userRepository.update).toHaveBeenCalledWith(1, expect.objectContaining({
//         name: userDTO.name,
//         email: userDTO.email,
//         password: 'newHashedPassword',
//         role: userDTO.role,
//       }));
//     });

//     it('should throw an error if user not found', async () => {
//       const userDTO: UpdateUserDTO = {
//         name: 'Updated Name',
//         email: 'updated@example.com',
//         password: 'newpassword',
//         role: 'USER',
//       };

//       jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

//       await expect(userService.editUser(1, userDTO)).rejects.toThrowError('Usuário não encontrado');
//     });
//   });

//   describe('deactivateUser', () => {
//     it('should deactivate the user', async () => {
//       const user = new User(1, 'John Doe', 'john@example.com', 'hashedPassword', 'USER', true, new Date(), new Date());
//       jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
//       jest.spyOn(userRepository, 'deactivate').mockResolvedValue();

//       await expect(userService.deactivateUser(1)).resolves.toBeUndefined();
//       expect(userRepository.deactivate).toHaveBeenCalledWith(1);
//     });

//     it('should throw an error if user not found', async () => {
//       jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

//       await expect(userService.deactivateUser(1)).rejects.toThrowError('Usuário não encontrado');
//     });
//   });
// });
