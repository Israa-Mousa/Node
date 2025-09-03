import { User } from './user.entity';
import { z } from 'zod';

export type UserDTO = Omit<User, 'password'>;

export type RegisterDTO = Pick<User, 'email' | 'password' | 'name'>;

export type RegisterResponseDTO = Omit<User, 'password'>;
export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;
export type GetUserProfileDTO = Omit<User, 'password'>;

export const RegisterDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

export const LoginDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
