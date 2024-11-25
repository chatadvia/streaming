// import { CreateMovieDTO, UpdateMovieDTO } from "../../../domain/dtos/MovieDTO";
// import { Movie } from "../../../domain/entities/Movie";
// import { MovieRepository } from "../../../domain/repositories/MovieRepository";
// import { MovieService } from "../../../domain/services/MovieService";


// // Mock do MovieRepository
// jest.mock('../repositories/MovieRepository');
// const mockMovieRepository = new MovieRepository() as jest.Mocked<MovieRepository>;

// // Instância do MovieService
// let movieService: MovieService;

// beforeEach(() => {
//   movieService = new MovieService(mockMovieRepository);
// });

// describe('MovieService', () => {
//   // Teste de criação de filme
//   it('should create a new movie', async () => {
//     const movieData: CreateMovieDTO = {
//       title: 'Inception',
//       genre: 'Sci-Fi',
//       director: 'Christopher Nolan',
//       actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
//       description: 'A mind-bending thriller',
//     };

//     const savedMovie = {
//       ...movieData,
//       id: 1,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     mockMovieRepository.save.mockResolvedValue(movieData);

//     const result = await movieService.create(movieData);

//     expect(result).toBeInstanceOf(Movie);
//     expect(result.title).toBe(movieData.title);
//     expect(mockMovieRepository.save).toHaveBeenCalledWith(movieData);
//   });

//   // Teste de obter todos os filmes
//   it('should return a list of movies', async () => {
//     const movieList = [
//       new Movie(1, 'Inception', 'Sci-Fi', 'Christopher Nolan', ['Leonardo DiCaprio'], 'A mind-bending thriller', new Date(), new Date()),
//       new Movie(2, 'Titanic', 'Romance', 'James Cameron', ['Leonardo DiCaprio', 'Kate Winslet'], 'A love story', new Date(), new Date())
//     ];

//     mockMovieRepository.findAll.mockResolvedValue(movieList);

//     const result = await movieService.getAll();

//     expect(result).toHaveLength(2);
//     expect(result[0].title).toBe('Inception');
//     expect(mockMovieRepository.findAll).toHaveBeenCalled();
//   });

//   // Teste de buscar filme por ID
//   it('should return a movie by ID', async () => {
//     const movie = new Movie(1, 'Inception', 'Sci-Fi', 'Christopher Nolan', ['Leonardo DiCaprio'], 'A mind-bending thriller', new Date(), new Date());

//     mockMovieRepository.findById.mockResolvedValue(movie);

//     const result = await movieService.getById(1);

//     expect(result).toBeInstanceOf(Movie);
//     expect(result.title).toBe('Inception');
//     expect(mockMovieRepository.findById).toHaveBeenCalledWith(1);
//   });

//   it('should throw an error if movie is not found', async () => {
//     mockMovieRepository.findById.mockResolvedValue(null);

//     await expect(movieService.getById(1)).rejects.toThrow('Filme não encontrado');
//   });

//   // Teste de atualização de filme
//   it('should update an existing movie', async () => {
//     const movieDTO: UpdateMovieDTO = {
//       title: 'Inception Updated',
//       genre: 'Sci-Fi',
//       director: 'Christopher Nolan',
//       actors: ['Leonardo DiCaprio', 'Tom Hardy'],
//       description: 'Updated description',
//     };

//     const existingMovie = new Movie(1, 'Inception', 'Sci-Fi', 'Christopher Nolan', ['Leonardo DiCaprio'], 'A mind-bending thriller', new Date(), new Date());
//     mockMovieRepository.findById.mockResolvedValue(existingMovie);

//     const updatedMovie = { ...existingMovie, ...movieDTO };
//     mockMovieRepository.update.mockResolvedValue(updatedMovie);

//     const result = await movieService.update(1, movieDTO);

//     expect(result).toBeInstanceOf(Movie);
//     expect(result.title).toBe('Inception Updated');
//     expect(mockMovieRepository.update).toHaveBeenCalledWith(1, movieDTO);
//   });

//   it('should throw an error if movie to update is not found', async () => {
//     mockMovieRepository.findById.mockResolvedValue(null);

//     const movieDTO: UpdateMovieDTO = { title: 'Inception Updated' };

//     await expect(movieService.update(1, movieDTO)).rejects.toThrow('Filme não encontrado');
//   });

//   // Teste de exclusão de filme
//   it('should delete a movie', async () => {
//     const movie = new Movie(1, 'Inception', 'Sci-Fi', 'Christopher Nolan', ['Leonardo DiCaprio'], 'A mind-bending thriller', new Date(), new Date());

//     mockMovieRepository.findById.mockResolvedValue(movie);
//     mockMovieRepository.delete.mockResolvedValue(undefined);

//     await movieService.delete(1);

//     expect(mockMovieRepository.delete).toHaveBeenCalledWith(1);
//   });

//   it('should throw an error if movie to delete is not found', async () => {
//     mockMovieRepository.findById.mockResolvedValue(null);

//     await expect(movieService.delete(1)).rejects.toThrow('Filme não encontrado');
//   });

//   // Teste de votação em filme
//   it('should register a movie rating', async () => {
//     const ratingData: RatingDTO = { movieId: 1, userId: 1, rating: 5 };

//     mockMovieRepository.rateMovie.mockResolvedValue(undefined);
//     mockMovieRepository.updateMovieAverageVote.mockResolvedValue(undefined);

//     const result = await movieService.rateMovie(ratingData);

//     expect(result.message).toBe('Voto registrado com sucesso');
//     expect(mockMovieRepository.rateMovie).toHaveBeenCalledWith(1, 1, 5);
//   });

//   // Teste de média de votos de filme
//   it('should return the movie average vote', async () => {
//     const movie = new Movie(1, 'Inception', 'Sci-Fi', 'Christopher Nolan', ['Leonardo DiCaprio'], 'A mind-bending thriller', new Date(), new Date(), 4.5);

//     mockMovieRepository.findById.mockResolvedValue(movie);

//     const result = await movieService.getMovieAverage(1);

//     expect(result.averageVote).toBe(4.5);
//   });

//   it('should throw an error if movie average is requested but movie is not found', async () => {
//     mockMovieRepository.findById.mockResolvedValue(null);

//     await expect(movieService.getMovieAverage(1)).rejects.toThrow('Filme não encontrado');
//   });
// });
