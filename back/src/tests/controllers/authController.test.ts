import request from 'supertest';
import prisma from '../../shared/utils/prismaClient';
import app from '../..';


// Mock do Prisma para evitar chamadas ao banco de dados
jest.mock('../utils/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

// Mock para a função de gerar tokens
jest.mock('../utils/authService', () => ({
  generateToken: jest.fn(() => 'mocked-jwt-token'),
}));

describe('AuthController - Login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve retornar um token válido quando as credenciais estiverem corretas', async () => {
    // Mockando um usuário válido
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: '$2a$10$mockedHashedPassword', // Senha hash simulada
      role: 'user',
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'correct-password',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked-jwt-token');
  });

  it('deve retornar erro 401 quando o email não for encontrado', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null); // Nenhum usuário encontrado

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'invalid@example.com',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
  });

  it('deve retornar erro 401 quando a senha estiver incorreta', async () => {
    // Mockando um usuário válido
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: '$2a$10$mockedHashedPassword',
      role: 'user',
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
  });

  it('deve retornar erro 500 em caso de erro inesperado', async () => {
    // Mockando um erro no Prisma
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Erro no Prisma'));

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'correct-password',
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erro ao realizar login');
  });
});
