import { Role } from './role.enum';
import { User } from './user.entity';
import { z } from 'zod';

// User DTO without password
export type UserDTO = Omit<User, 'password'>;

// Register DTO (for creating a new user)
export type RegisterDTO = Pick<User, 'email' | 'password' | 'name' | 'role'>;

// Register Response DTO (return user without password)
export type RegisterResponseDTO = Omit<User, 'password'>;

// Update User DTO (for updating user details)
export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email' | 'role'>>;

// Get User Profile DTO (to return user profile without password)
export type GetUserProfileDTO = Omit<User, 'password'>;

// Zod schema for Register DTO
export const RegisterDTOSchema = z.object({
  name:z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role).default(Role.STUDENT), // role is optional, default is "STUDENT"
});

// Zod schema for Login DTO
export const LoginDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
