import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const JWT_SECRET = process.env.JWT_SECRET; // Retrieve the secret from environment variables

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in the environment');
}

export const signJwt = (payload: JwtPayload, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
