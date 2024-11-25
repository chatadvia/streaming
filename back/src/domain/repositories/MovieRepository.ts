import prisma from '../../shared/utils/prismaClient';
import { CreateMovieDTO, MovieResponseDTO, UpdateMovieDTO } from '../../application/dtos/MovieDTO';
import { RatingDTO } from '../../application/dtos/RatingDTO';
import { Movie } from '../entities/Movie';

export class MovieRepository {
  
  public async save(movieDTO: CreateMovieDTO): Promise<MovieResponseDTO> {
    const actors = Array.isArray(movieDTO.actors)
    ? movieDTO.actors
    : movieDTO.actors.split(',').map((actor: string) => actor.trim());

    const newMovie = await prisma.movie.create({
      data: {
        title: movieDTO.title,
        description: movieDTO.description,
        genre: movieDTO.genre,
        director: movieDTO.director, 
        actors: actors,
        imageUrl: movieDTO.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return this.toDomain(newMovie);
  }

  public async findAll(): Promise<Movie[]> {
    const movies = await prisma.movie.findMany({
      include: {
        ratings: true, 
      },
    });
    return movies.map(this.toDomain);
  }

  public async findById(id: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: { id: id },
      include: {
        ratings: true, 
      },
    });

    return movie ? this.toDomain(movie) : null;
  }

  public async update(id: any, movieDTO: UpdateMovieDTO): Promise<Movie | null> {
    const updatedMovie = await prisma.movie.update({
      where: { id: id },
      data: {
        title: movieDTO.title,
        description: movieDTO.description,
        genre: movieDTO.genre,
        director: movieDTO.director,
        actors: movieDTO.actors,
        averageVote: movieDTO.averageVote,
        updatedAt: new Date(),
      },
    });

    return this.toDomain(updatedMovie);
  }

  public async delete(id: any): Promise<void> {
    await prisma.movie.delete({
      where: { id: id },
    });
  }

  async rateMovie(movieId: string, userId: string, rating: number, comment?: string) {
    const response = await prisma.rating.upsert({
      where: {
        movieId_userId: { movieId, userId },
      },
      update: {
        rating,
        comment,
      },
      create: {
        movieId,
        userId,
        rating,
        comment,
      },
    });

    return response;
  }

  public async updateAverageVote(movieId: string, averageVote: number): Promise<void> {
    await prisma.movie.update({
      where: { id: movieId },
      data: { averageVote },
    });
  }

  public async getMovieRating(movieId: string): Promise<RatingDTO[]> {
    const movieRatings = await prisma.rating.findMany({
      where: { movieId },
    });
  
    return movieRatings.map(rating => ({
      rating: rating.rating,
      comment: rating.comment ?? null,
      userId: rating.userId,
      createdAt: rating.createdAt,
      movieId: rating.movieId,
    }));
  }
  

  // async updateMovieAverageVote(movieId: string) {

  //   const movieRatings = await prisma.rating.findMany({
  //     where: { movieId },
  //   });
    
  //   const totalVotes = movieRatings.length;
  //   const average = totalVotes > 0
  //     ? movieRatings.reduce((acc, rating) => acc + rating.rating, 0) / totalVotes
  //     : 0;

  //   return await prisma.movie.update({
  //     where: { id: movieId },
  //     data: { averageVote: average },
  //   });
  // }

  // public async updateRating(userId: any, movieId: any, ratingDTO: RatingDTO): Promise<boolean> {
  //   try {
  //     const existingRating = await prisma.rating.findUnique({
  //        where: {
  //         movieId_userId: {
  //           userId: userId,
  //           movieId: movieId,
  //         },
  //       },
  //     });

  //     if (existingRating) {
  //       await prisma.rating.update({
  //         where: {
  //           movieId_userId: {
  //             userId: userId,
  //             movieId: movieId,
  //           },
  //         },
  //         data: {
  //           rating: ratingDTO.rating,
  //           comment: ratingDTO.comment,
  //         },
  //       });
  //     } else {
  //       return false;
  //     }

  //     return true; 
  //   } catch (error) {
  //     console.error('Erro ao atualizar o rating:', error);
  //     throw new Error('Falha ao atualizar o rating.');
  //   }
  // }

  private toDomain(movie: any): Movie {
    return new Movie(
      movie.id,
      movie.title,
      movie.genre,
      movie.director,
      movie.averageVote,
      movie.actors,
      movie.description,
      movie.createdAt,
      movie.updatedAt,
      movie.imageUrl,
    );
  }
}
