import { User } from '../users/user.entity';
export type RegisterDTO = Pick<User, 'email' | 'password' | 'name' >;

export type LoginDTO = {
  email: string;
  password: string;
};
// we only used jwt in login response
export type LoginResponseDTO={
data:Omit<User,'password'>;
token:string;
}

export type UpdateUserProfileDTO = Partial<Pick<User, 'name' | 'email' >>;

export type GetUserProfileDTO = Omit<User, 'password'>;

export type UserResponseDTO = Omit<User, 'password'>;
