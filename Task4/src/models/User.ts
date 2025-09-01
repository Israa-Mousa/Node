export interface User {
    id: number;   
    name: string;
    email: string;
    age: number;
    role : 'Admin' |'Student' | 'Teacher' |'Employee';
}