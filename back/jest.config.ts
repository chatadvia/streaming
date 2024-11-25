import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Usa o preset do ts-jest para lidar com TypeScript
  testEnvironment: 'node', // Define o ambiente de teste (pode ser 'jsdom' para frontend)
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos .ts e .tsx com ts-jest
  },
  moduleFileExtensions: ['ts', 'js'], // Extensões de arquivo que o Jest reconhece
  testMatch: [
    '**/?(*.)+(spec|test).ts', // Padrão para arquivos de teste
  ],
};

export default config;
