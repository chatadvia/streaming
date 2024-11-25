import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no ambiente');
}

export const generateToken = (payload: object, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    const response = jwt.verify(token, JWT_SECRET)

    return response;
  } catch (error) {
    console.log('error: ' + error)
    throw new Error('Token inválido ou expirado');
  }
};
