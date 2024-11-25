import { Request, Response } from 'express';
import { CreateMovieDTO, UpdateMovieDTO } from '../../application/dtos/MovieDTO';
import { MovieService } from '../../application/services/MovieService';
import { RatingDTO } from '../../application/dtos/RatingDTO';

export class MovieController {
  private movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  public async create(req: Request, res: Response): Promise<Response> {

    const { title, description, genre, director, actors }: CreateMovieDTO = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const userId = req.params.userId;

    try {
      const newMovie = await this.movieService.create({
        title,
        description,
        genre,
        director,
        actors,
        imageUrl,
      }, userId);
      
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async getAll(res: Response): Promise<Response> {
    try {
      const movies = await this.movieService.getAll();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const movie = await this.movieService.getById(id);
      if (!movie) {
        return res.status(404).json({ error: 'Filme não encontrado' });
      }
      return res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, genre, director, actors, averageVote }: UpdateMovieDTO = req.body;

    try {
      const updatedMovie = await this.movieService.update(id, { title, description, genre, director, actors, averageVote });
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Filme não encontrado' });
      }
      return res.status(200).json(updatedMovie);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await this.movieService.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "error.message "});
    }
  }

  async rateMovie(req: Request<{}, {}, RatingDTO >, res: Response) {
    try {
      const { movieId, userId, rating, comment } = req.body;

      const result = await this.movieService.rateMovie({ movieId, userId, rating });

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
