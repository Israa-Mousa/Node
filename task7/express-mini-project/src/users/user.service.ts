import { User } from "./user.entity";
import { Role } from "./role.enum";
import { userRepository } from "./user.repsitory";
import argon2 from "argon2";
import { CustomError } from "../shared/utils/exception";

class UserService {
  getUsers(page: number, limit: number): User[] {
    return userRepository.findAll().slice((page - 1) * limit, page * limit);
  }

  getUser(id: string): User | undefined {
    return userRepository.findById(id);
  }

   findByEmail(email:string){
    return  userRepository.findByEmail(email);
  }

 async updateUser(id: string, updateData: Partial<User>): Promise<User | undefined> {
    const user = userRepository.findById(id);
    if (!user) {
      throw new CustomError('User not found', 'USER', 404);
    }

    const userRole = Role[updateData.role as keyof typeof Role] || user.role;
    const updatedUser = await userRepository.update(id, updateData.email || user.email, updateData.name || user.name, userRole);
    if (!updatedUser) {
      throw new CustomError('Failed to update user', 'USER', 500);
    }
    return updatedUser;
  }
  async createUser(name: string, email: string, password: string, role: string = "STUDENT"): Promise<User> {
    const userRole = Role[role as keyof typeof Role] || Role.STUDENT;
    const newUser: User = {
      id: (userRepository.findAll().length + 1).toString(),
      name,
      email,
      password,
      role: userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
     const user=userRepository.create( name,email,password,userRole);
    return user
  }

  deleteUser(id: string): boolean {
    return userRepository.delete(id);
  }
    isUserIdExist(id:string):boolean{
      console.log('Checking if user exists with ID:', id);
   return !! userRepository.findById(id);
  }
}

export const userService = new UserService();
