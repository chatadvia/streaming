import express from 'express';
import { login } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  await login(req, res);
});

export default authRouter;
