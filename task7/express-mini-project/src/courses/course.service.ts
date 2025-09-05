import { Course } from './course.entity';
import { CustomError } from '../shared/utils/exception';
import { courseRepository } from './course.repsitory';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';

class CourseService {
  public getCourses(page: number, limit: number): Course[] {
    return courseRepository.findAll().slice((page - 1) * limit, page * limit);
  }

  public getCourse(id: string): Course | undefined {
    return courseRepository.findById(id);
  }

  public async createCourse(
    title: string,
    description: string,
    createdBy: string,
    image: string
  ): Promise<Course> {
    const newCourse: Course = {
      id: (courseRepository.findAll().length + 1).toString(),
      title,
      description,
      createdBy,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return courseRepository.create(newCourse);
  }

  public async updateCourse(
    id: string,
    updateData: Partial<UpdateCourseDTO>
  ): Promise<Course | undefined> {
    const course = await courseRepository.findById(id);
    if (!course) {
      throw new CustomError('Course not found', 'COURSE', 404);
    }
    Object.assign(course, updateData);
    course.updatedAt = new Date();
    return courseRepository.update(id, course);
  }

  public deleteCourse(id: string): boolean {
    return courseRepository.delete(id);
  }
    public async findById(id: string): Promise<Course | null> {
    const course = await courseRepository.findById(id);
    if (!course) return null;
    return course;
  }
}

export const courseService = new CourseService();
