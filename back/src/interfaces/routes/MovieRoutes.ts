import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../../shared/middleware/authMiddleware';
import { MovieRepository } from '../../domain/repositories/MovieRepository';
import { MovieService } from '../../application/services/MovieService';
import { MovieController } from '../controllers/MovieController';
import { RatingDTO } from '../../application/dtos/RatingDTO';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { upload } from '../../shared/utils/multer';

const userRepository = new UserRepository();
const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository, userRepository);
const movieController = new MovieController(movieService);

const movieRoutes = Router();

movieRoutes.post('/:userId', upload.single('imageUrl'), asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await movieController.create(req, res);
}));

movieRoutes.get('/', (req, res) => {
  movieController.getAll(res);
});

movieRoutes.get('/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await movieController.getById(req, res);
}));

movieRoutes.put('/:id', authenticateJWT, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await movieController.update(req, res);
}));

movieRoutes.delete('/:id', authenticateJWT, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await movieController.delete(req, res);
}));

movieRoutes.post('/rate/vote', authenticateJWT, asyncHandler(async (req: Request<{}, {}, RatingDTO>, res: Response) => {
  await movieController.rateMovie(req, res);
}));

export { movieRoutes };
