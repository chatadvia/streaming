import { MovieRepository } from '../../domain/repositories/MovieRepository';
import { CreateMovieDTO, UpdateMovieDTO } from '../dtos/MovieDTO';
import { Movie } from '../../domain/entities/Movie';
import { RatingDTO } from '../dtos/RatingDTO';
import { uploadImage } from '../../shared/middleware/uploadImage';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { checkIfAdmin } from '../../shared/utils/checkIfAdmin';

export class MovieService {
  private movieRepository: MovieRepository;
  private userRepository: UserRepository;

  constructor(movieRepository: MovieRepository, userRepository: UserRepository) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
  }

  public async create(data: CreateMovieDTO, userId: any): Promise<Movie> {
    let imageUrl = '';

    const isAdmin = await checkIfAdmin(userId, this.userRepository);

    if (!isAdmin) {
      throw new Error('Somente administradores podem cadastrar usuários');
    }

    if (data.imageUrl) {
      const uploadedImage = await uploadImage(data.imageUrl);
      imageUrl = uploadedImage.secure_url;
    }

    const actorsArray = Array.isArray(data.actors) ? data.actors : data.actors.split(',').map((actor: string) => actor.trim());

    const createdMovie = await this.movieRepository.save({
      ...data,
      actors: actorsArray,
      imageUrl,
    });
  
    return new Movie(
      createdMovie.id,
      createdMovie.title,
      createdMovie.genre,
      createdMovie.director,
      createdMovie.averageVote,
      createdMovie.actors,
      createdMovie.description,
      createdMovie.createdAt,
      createdMovie.updatedAt,
      createdMovie.imageUrl,
    );
  }

  public async getAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  public async getById(id: string): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    return movie;
  }

  public async update(id: string, movieDTO: UpdateMovieDTO): Promise<Movie | null> {
    const existingMovie = await this.movieRepository.findById(id);
    if (!existingMovie) {
      throw new Error('Filme não encontrado');
    }
  
    const updatedData: UpdateMovieDTO = {
      title: movieDTO.title ?? existingMovie.title,
      genre: movieDTO.genre ?? existingMovie.genre,
      director: movieDTO.director ?? existingMovie.director,
      actors: movieDTO.actors ?? (Array.isArray(existingMovie.actors) ? existingMovie.actors : []),
      description: movieDTO.description ?? existingMovie.description,
      averageVote: movieDTO.averageVote ?? existingMovie.averageVote,
    };
  
    const updatedMovie = await this.movieRepository.update(id, updatedData);
  
    return updatedMovie;
  }

  public async delete(id: string): Promise<void> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    await this.movieRepository.delete(id);
  }

  async rateMovie({ movieId, userId, rating, comment }: RatingDTO ) {
    await this.movieRepository.rateMovie(movieId, userId, rating);

    await this.updateMovieAverageVote(movieId);

    return { message: 'Voto registrado com sucesso' };
  }

  async getMovieAverage(movieId: string) {
    const movie = await this.getById(movieId);

    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    return { averageVote: movie.averageVote };
  }

  public async updateMovieAverageVote(movieId: string): Promise<void> {
    const movieRatings = await this.movieRepository.getMovieRating(movieId);
    const totalVotes = movieRatings.length;

    const averageVote = totalVotes > 0
    ? movieRatings.reduce((acc: number, rating: RatingDTO) => acc + rating.rating, 0) / totalVotes
    : 0;
  
    return await this.movieRepository.updateAverageVote(movieId, averageVote);
  }
  
  
}
