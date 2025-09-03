import { Role } from '../shared/repositories/role.enum';
import { User } from './user.entity';

export class UserRepository {
  private users: User[] = [
    {
      id: 'u1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      createdAt: new Date('2025-01-01T10:00:00Z'),
      updatedAt: new Date('2025-01-01T10:00:00Z'),
      password: 'hashedpassword123',
      role: Role.ADMIN, 
    },
    {
      id: 'u2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: new Date('2025-02-01T12:00:00Z'),
      updatedAt: new Date('2025-02-01T12:00:00Z'),
      password: 'hashedpassword123',
      role: Role.COACH,
    },
    {
      id: 'u3',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      createdAt: new Date('2025-03-01T14:30:00Z'),
      updatedAt: new Date('2025-03-01T14:30:00Z'),
      password: 'hashedpassword123',
      role: Role.STUDENT,
    },
  ];

  private idCounter = 4; 

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(name: string, email: string, password: string, role: Role): User {
    const user: User = {
      id: this.idCounter.toString(), 
      name,
      email,
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.idCounter++;  
    this.users.push(user);
    console.log('Created user:', user);
    return user;
  }

  update(
    id: string,
    name?: string,
    email?: string,
    role?: Role
  ): User | null {
    const user = this.findById(id);
    if (!user) return null;

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;  
    user.updatedAt = new Date(); 

    return user;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

export const userRepository = new UserRepository();