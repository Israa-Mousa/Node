import { Request, Response, NextFunction } from 'express';
import { CustomError, handleError } from '../shared/utils/exception';
import { courseService } from './course.service';
import { CreateCourseDTOSchema, UpdateCourseDTOSchema } from './course.dto';
import { zodValidation } from '../shared/utils/zod.utill';
import { userService } from '../users/user.service';

export class CourseController {
  private _courseService = courseService;

  getCourses = (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const courses = this._courseService.getCourses(page, limit);
      res.ok(courses);
    } catch (error) {
      handleError(error, res);
    }
  };

  getCourse = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const course = this._courseService.getCourse(req.params.id);
      if (!course) {
        throw new CustomError('Course not found', 'COURSE', 404);
      }
      res.ok(course);
    } catch (error) {
      handleError(error, res);
    }
  };

  public createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = CreateCourseDTOSchema.safeParse(req.body);
      console.log('Parsed create data:', parsed);
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.format() });
      }

      const { title, description } = parsed.data;
      const image = req.file ? req.file.filename : '';
      const createdBy = req.user?.id || '';
     console.log('User creating course:', createdBy);
      const newCourse = await this._courseService.createCourse(title, description, createdBy, image);
      const creator = await userService.findById(createdBy);

    const response = {
      ...newCourse,
      createdBy: creator?.name || 'Unknown'
    };

    res.create(response);
    //res.create(newCourse);
    } catch (error) {
      handleError(error, res);
    }
  };

  // updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     //const parsed = UpdateCourseDTOSchema.safeParse(req.body);
  //     const parsed=zodValidation(UpdateCourseDTOSchema,req.body,'COURSE');
  //     if (!parsed.success) {
  //       return res.status(400).json({ errors: parsed.error.format() });
  //     }

  //     const image = req.file ? req.file.filename : undefined;

  //     if (!req.params.id) {
  //       return res.status(400).json({ error: 'Course ID is required' });
  //     }

  //     const { title, description } = parsed.data;
  //    // const createdBy = req.user?.id || '';
  //     const updatedCourse = await courseService.updateCourse(req.params.id, {
  //       title,
  //       description,
  //      // createdBy,
  //       image,
  //     });

  //     if (!updatedCourse) {
  //       throw new CustomError('Course not found', 'COURSE', 404);
  //     }

  //     res.create(updatedCourse);
  //   } catch (error) {
  //     handleError(error, res);
  //   }
  // };
updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // التحقق من صحة البيانات
    const parsed = zodValidation(UpdateCourseDTOSchema, req.body, 'COURSE');
     console.log('Parsed update data:', parsed);
    const { title, description } = parsed;

    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const existingCourse = await courseService.findById(courseId);
    if (!existingCourse) {
      throw new CustomError('Course not found', 'COURSE', 404);
    }

    const user = req.user;
    if (!user) {
      throw new CustomError('Unauthorized', 'AUTH', 401);
    }

    if (user.role === 'COACH' && existingCourse.createdBy !== user.id) {
      throw new CustomError('Forbidden: You can only edit your own courses', 'COURSE', 403);
    }

    
    const image = req.file ? req.file.filename : existingCourse.image;

    const updatedCourse = await courseService.updateCourse(courseId, {
      title,
      description,
      createdBy: existingCourse.createdBy, 
      image,
    });
    if (!updatedCourse) {
      throw new CustomError('Course not found after update', 'COURSE', 404);
    }
 const creator = await userService.findById(updatedCourse.createdBy);

    const response = {
      ...updatedCourse,
      createdBy: creator?.name || 'Unknown'
    };

    res.create(response);
   // res.create(updatedCourse);
  } catch (error) {
    handleError(error, res);
  }
};

  deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID required' });
      const deleted = this._courseService.deleteCourse(id);
      if (!deleted) {
        throw new CustomError('Course not found', 'COURSE', 404);
      }
      res.ok({});
    } catch (error) {
      handleError(error, res);
    }
  };
}

export const courseController = new CourseController();
