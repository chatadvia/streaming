// src/__tests__/repositories/MovieRepository.spec.ts
import { PrismaClient } from '@prisma/client';
import { MovieRepository } from '../../../domain/repositories/MovieRepository';
import { CreateMovieDTO, UpdateMovieDTO } from '../../../application/dtos/MovieDTO';
import { RatingDTO } from '../../../application/dtos/RatingDTO';
import { Movie } from '../../../domain/entities/Movie';


// Criar tipo para o mock do Prisma
type MockPrismaClient = {
  movie: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  rating: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
  };
};

// Criar mock do Prisma com tipagem
const mockPrismaClient = {
  movie: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  rating: {
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

describe('MovieRepository', () => {
  let movieRepository: MovieRepository;
  const mockDate = new Date('2024-01-01');

  // Mock de um filme para testes
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    description: 'Test Description',
    genre: 'Action',
    director: 'Test Director',
    actors: ['Actor 1', 'Actor 2'],
    imageUrl: 'http://test.com/image.jpg',
    averageVote: 4.5,
    createdAt: mockDate,
    updatedAt: mockDate,
    ratings: [],
  };

  beforeEach(() => {
    movieRepository = new MovieRepository();
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should create a new movie successfully', async () => {
      const movieDTO: CreateMovieDTO = {
        title: mockMovie.title,
        description: mockMovie.description,
        genre: mockMovie.genre,
        director: mockMovie.director,
        actors: 'Actor 1, Actor 2',
        imageUrl: mockMovie.imageUrl,
      };

      (mockPrismaClient.movie.create as jest.Mock).mockResolvedValue(mockMovie);

      const result = await movieRepository.save(movieDTO);

      expect(mockPrismaClient.movie.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: movieDTO.title,
          description: movieDTO.description,
          actors: ['Actor 1', 'Actor 2'],
          createdAt: expect.any(Date),
        }),
      });

      expect(result).toBeInstanceOf(Movie);
      expect(result.title).toBe(movieDTO.title);
    });

    it('should handle array of actors', async () => {
      const movieDTO: CreateMovieDTO = {
        title: mockMovie.title,
        description: mockMovie.description,
        genre: mockMovie.genre,
        director: mockMovie.director,
        actors: ['Actor 1', 'Actor 2'],
        imageUrl: mockMovie.imageUrl,
      };

      (mockPrismaClient.movie.create as jest.Mock).mockResolvedValue(mockMovie);

      await movieRepository.save(movieDTO);

      expect(mockPrismaClient.movie.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          actors: ['Actor 1', 'Actor 2'],
        }),
      });
    });
  });

  describe('findAll', () => {
    it('should return all movies with ratings', async () => {
      const mockMovies = [mockMovie, { ...mockMovie, id: '2', title: 'Test Movie 2' }];
      (mockPrismaClient.movie.findMany as jest.Mock).mockResolvedValue(mockMovies);

      const result = await movieRepository.findAll();

      expect(mockPrismaClient.movie.findMany).toHaveBeenCalledWith({
        include: { ratings: true },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Movie);
      expect(result[1]).toBeInstanceOf(Movie);
    });
  });

  describe('findById', () => {
    it('should return movie when found', async () => {
      (mockPrismaClient.movie.findUnique as jest.Mock).mockResolvedValue(mockMovie);

      const result = await movieRepository.findById('1');

      expect(mockPrismaClient.movie.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { ratings: true },
      });
      expect(result).toBeInstanceOf(Movie);
      expect(result?.id).toBe('1');
    });

    it('should return null when movie not found', async () => {
      (mockPrismaClient.movie.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await movieRepository.findById('999');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    const updateDTO: UpdateMovieDTO = {
      title: 'Updated Title',
      description: 'Updated Description',
      genre: 'Drama',
      director: 'New Director',
      actors: ['New Actor 1', 'New Actor 2'],
      averageVote: 4.8,
    };

    it('should update movie successfully', async () => {
      (mockPrismaClient.movie.update as jest.Mock).mockResolvedValue({
        ...mockMovie,
        ...updateDTO,
      });

      const result = await movieRepository.update('1', updateDTO);

      expect(mockPrismaClient.movie.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({
          title: updateDTO.title,
          description: updateDTO.description,
          updatedAt: expect.any(Date),
        }),
      });
      expect(result).toBeInstanceOf(Movie);
      expect(result?.title).toBe(updateDTO.title);
    });
  });

  describe('delete', () => {
    it('should delete movie successfully', async () => {
      (mockPrismaClient.movie.delete as jest.Mock).mockResolvedValue(mockMovie);

      await movieRepository.delete('1');

      expect(mockPrismaClient.movie.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('rateMovie', () => {
    it('should create a new rating successfully', async () => {
      const mockRating = {
        id: '1',
        movieId: '1',
        userId: '1',
        rating: 4,
        comment: 'Great movie!',
      };

      (mockPrismaClient.rating.create as jest.Mock).mockResolvedValue(mockRating);

      const result = await movieRepository.rateMovie('1', '1', 4, 'Great movie!');

      expect(mockPrismaClient.rating.create).toHaveBeenCalledWith({
        data: {
          movieId: '1',
          userId: '1',
          rating: 4,
        },
      });
      expect(result).toEqual(mockRating);
    });
  });
});