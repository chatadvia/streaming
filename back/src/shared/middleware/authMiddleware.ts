import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authService';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido ou formato inválido' });
    return; 
  }

  const token = authHeader.split(' ')[1];

  try {
    verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Autenticação falhou: '});
    return; 
  }
};
