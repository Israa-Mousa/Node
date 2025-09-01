export interface User {
    id: number;     
    name: string;
    email: string;
    age: number;
    role: 'Admin' | 'Student' | 'Teacher' | 'Employee';
}

import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super();
        this.data = [
            { id: 1, name: 'Israa', email: 'israa@example.com', age: 30, role: 'Admin' },
            { id: 2, name: 'Mousa', email: 'mousa@example.com', age: 28, role: 'Teacher' }
        ];
    } 

 
}