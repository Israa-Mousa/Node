import { UserRepository } from './Repository/UserRepository';
import { CourseRepository } from './Repository/CourseRepository';
import { BookingRepository } from './Repository/BookingRepository';

async function runTests() {
  const users = new UserRepository();
  const courses = new CourseRepository();
  const bookings = new BookingRepository();

  console.log('All Users:', await users.getAll());
  console.log('User by ID (2):', await users.getById(2));
  console.log('All Course:', await courses.getAll());
  console.log('course by ID (2):', await courses.getById(2));
  console.log('Booking by ID (16):', await bookings.getById(16));

  console.log('Create User:', await users.create({
    id: 3, name: 'Nada', email: 'nada@example.com', age: 29, role: 'Teacher'
  }));

  console.log('All Courses:', await courses.getAll());
  console.log('All Bookings:', await bookings.getAll());
  console.log('Filter Bookings (status = true):', await bookings.findByFilter({ status: true }));
}

runTests();
