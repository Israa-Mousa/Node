import { Course } from './course.entity';  

export class CourseRepository {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Node.js',
      description: 'Description for Node.js',
      createdBy: '1',
     // image: 'course1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Express',
      description: 'Description Express',
      createdBy: '2',
      // image: 'course2.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  create(course: Course): Course {
    this.courses.push(course);
    return course;
  }

  update(id: string, updatedCourse: Course): Course | undefined {
    const index = this.courses.findIndex(course => course.id === id);
    if (index === -1) return undefined;
    this.courses[index] = updatedCourse;
    return updatedCourse;
  }

  delete(id: string): boolean {
    const index = this.courses.findIndex(course => course.id === id);
    if (index === -1) return false;
    this.courses.splice(index, 1);
    return true;
  }
}

export const courseRepository = new CourseRepository();
