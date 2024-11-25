import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { UpdateUserDTO } from '../../../application/dtos/UserDTO';


// Criando um tipo para o mock do Prisma
type MockPrismaClient = {
  user: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
  };
};

// Criando o mock do Prisma com tipagem
const mockPrismaClient = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
} as unknown as PrismaClient;

// Mock do módulo prismaClient
jest.mock('../../utils/prismaClient', () => ({
  __esModule: true,
  default: mockPrismaClient,
}));

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const mockDate = new Date('2024-01-01');

  // Mock de um usuário para testes
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword123',
    role: 'USER',
    active: true,
    createdAt: mockDate,
    updatedAt: mockDate,
    ratings: [],
  };

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should create a new user successfully', async () => {
      const userToCreate = new User(
        'undefined',
        mockUser.name,
        mockUser.email,
        mockUser.password,
        'USER',
        mockUser.active,
        mockUser.createdAt,
        mockUser.updatedAt,
        []
      );

      (mockPrismaClient.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.save(userToCreate);

      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: {
          name: mockUser.name,
          email: mockUser.email,
          password: mockUser.password,
          role: mockUser.role,
          active: mockUser.active,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
      });

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(mockUser.id);
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw an error if creation fails', async () => {
      const error = new Error('Database error');
      (mockPrismaClient.user.create as jest.Mock).mockRejectedValue(error);

      const userToCreate = new User(
        'undefined',
        mockUser.name,
        mockUser.email,
        mockUser.password,
        'USER',
        mockUser.active,
        mockUser.createdAt,
        mockUser.updatedAt,
        []
      );

      await expect(userRepository.save(userToCreate)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [mockUser, { ...mockUser, id: '2', email: 'test2@example.com' }];
      (mockPrismaClient.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userRepository.findAll();

      expect(mockPrismaClient.user.findMany).toHaveBeenCalledWith({
        include: { ratings: true },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(User);
      expect(result[1]).toBeInstanceOf(User);
    });
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      (mockPrismaClient.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findById('1');

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toBeInstanceOf(User);
      expect(result?.id).toBe('1');
    });

    it('should return null when user not found', async () => {
      (mockPrismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await userRepository.findById('999');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    const updateDTO: UpdateUserDTO = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    it('should update user successfully', async () => {
      (mockPrismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrismaClient.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...updateDTO,
      });

      const result = await userRepository.update('1', updateDTO);

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({
          name: updateDTO.name,
          email: updateDTO.email,
          updatedAt: expect.any(Date),
        }),
      });
      expect(result).toBeInstanceOf(User);
      expect(result?.name).toBe(updateDTO.name);
    });

    it('should throw error when updating with existing email', async () => {
      (mockPrismaClient.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        id: '2',  // Different user with same email
      });

      await expect(userRepository.update('1', updateDTO))
        .rejects
        .toThrow('Email já está em uso por outro usuário');
    });
  });

  describe('deactivate', () => {
    it('should deactivate user successfully', async () => {
      (mockPrismaClient.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        active: false,
      });

      await userRepository.deactivate('1');

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          active: false,
          updatedAt: expect.any(Date),
        },
      });
    });
  });

  describe('activate', () => {
    it('should activate user successfully', async () => {
      (mockPrismaClient.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        active: true,
      });

      await userRepository.activate('1');

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          active: true,
          updatedAt: expect.any(Date),
        },
      });
    });
  });
});