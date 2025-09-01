import { Course } from '../models/Course';
import { BaseRepository } from './BaseRepository';

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super();
    this.data = [
      { id: 1, title: 'Frontend Basics', description: 'Learn HTML, CSS, JS' },
      { id: 2, title: 'Backend Node.js', description: 'Express, APIs, etc' },
    ];
  }
}
export default CourseRepository;