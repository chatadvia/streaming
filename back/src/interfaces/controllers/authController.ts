import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../shared/utils/prismaClient';
import { generateToken } from '../../shared/utils/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id, role: user.role });

    return res.status(200).json({ token, userId: user.id, userName: user.name, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
