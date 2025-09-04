import { User } from "./user.entity";
import { Role } from "./role.enum";
import { userRepository } from "./user.repsitory";
import argon2 from "argon2";

class UserService {
  getUsers(page: number, limit: number): User[] {
    return userRepository.findAll().slice((page - 1) * limit, page * limit);
  }

  getUser(id: string): User | undefined {
    return userRepository.findById(id);
  }
    public findByEmail(email:string){
    return  userRepository.findByEmail(email);

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
       // const hashedPassword = await argon2.hash(password); 
       const user=userRepository.create( name,email,password,userRole);
       console.log('Created user:', user);
    return user
  }

  updateUser(id: string, name: string, email: string, role: string): User | null {
    const user = userRepository.findById(id);
    const userRole = Role[role as keyof typeof Role] || Role.STUDENT;
    if (!user) return null;
    user.name = name;
    user.email = email;
    user.updatedAt = new Date();
    user.role = userRole;
    return userRepository.update(id, name,email,userRole);
  }

  deleteUser(id: string): boolean {
    return userRepository.delete(id);
  }
    isUserIdExist(id:string):boolean{
   return !! userRepository.findById(id);
  }
}

export const userService = new UserService();
