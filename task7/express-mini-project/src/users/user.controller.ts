import { Request, Response,NextFunction } from 'express';
import { userService } from './user.service';
import { CustomError, handleError } from '../shared/utils/exception';
import { RegisterDTOSchema } from './user.dto';
import { zodValidation } from '../shared/utils/zod.utill';

export class UserController {
  private _userService = userService;

  getUsers = (
    req: Request<{}, {}, {}, { page: string; limit: string }>,
    res: Response
  ) => {
        try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = this._userService.getUsers(page, limit);
      res.ok(users);
    } catch (error) {
 handleError(error, res);  
  }
  
  };

  getUser =async (req: Request<{ id: string }>, res: Response) => {
   try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID required' });

      const user = await this._userService.getUser(id);
      if (!user) {
        throw new CustomError('User not found', 'USER', 404);
      }
      res.ok(user);
    } catch (error) {
      handleError(error, res);
    }
  };

//create studnet user
  createUser = async (req: Request, res: Response) => {
     try {
       const parsed = RegisterDTOSchema.safeParse(req.body);
            //const parsed = zodValidation(RegisterDTOSchema, req.body, 'AUTH');
     if (!parsed.success) {

 return res.status(400).json({
    error: 'Invalid input',
    details: parsed.error
  });    }
           const { name, email, password, role } = parsed.data;

      const user = await this._userService.createUser(name, email, password);
      res.create(user);
    } catch (error) {
      handleError(error, res);
    }
  };


  deleteUser = async(req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID required' });

      const deleted = await this._userService.deleteUser(id);
      if (!deleted) {
        throw new CustomError('User not found', 'USER', 404);
      }
      res.ok({});
    } catch (error) {
      handleError(error, res); 
    }
  };
 
 getCurrentUser = (req: Request, res: Response) => {
 try {
      const user = req.user;  
      if (!user) {
        throw new CustomError('User does not exist', 'USER', 404);  
      }
      res.ok(user); 
    } catch (error) {
      handleError(error, res);
    }
  };

// Update user profile
  updateUser = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new CustomError('Unauthenticated', 'USER', 401);
      }
     const parsed = RegisterDTOSchema.safeParse(req.body);
     if (!parsed.success) {
 return res.status(400).json({
    error: 'Invalid input',
    details: parsed.error
  });
    }
      const userId = req.user.id;
      const { name, email, role } = parsed.data;
      const updatedUser = await this._userService.updateUser(userId, { name, email, role });
      if (!updatedUser) {
        throw new CustomError('User not found', 'USER', 404);
      }

      res.create(updatedUser);
    } catch (error) {
      handleError(error, res); 
    }
  };

  // create COACH
  createCoachUser = async (req: Request, res: Response) => {
  
    try {
      if (!req.user) {
        throw new CustomError('Unauthenticated', 'USER', 401);
      }
      if (req.user.role !== 'ADMIN') {
        throw new CustomError('Unauthorized', 'USER', 403);
      }

      const { name, email, password } = req.body;
      const newCoach = await this._userService.createUser(name, email, password, 'COACH');
      res.create(newCoach); 
    } catch (error) {
      handleError(error, res); 
    }
  };
}
export const userController = new UserController();
