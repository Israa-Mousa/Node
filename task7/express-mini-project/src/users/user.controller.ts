import { Request, Response } from 'express';
import { userService } from './user.service';
import { CustomError } from '../shared/utils/exception';

export class UserController {
  private _userService = userService;

  getUsers = (
    req: Request<{}, {}, {}, { page: string; limit: string }>,
    res: Response
  ) => {
        console.log('UserController - getUsers');

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const users = this._userService.getUsers(page, limit);
    console.log('users', users);
    res.ok(users);
  };

  getUser = (req: Request<{ id: string }>, res: Response) => {
    console.log('req.params', req.params);
    const id = req.params.id;
    console.log('id', id);
    if (!id) return res.status(400).json({ error: 'ID required' });

    const user = this._userService.getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.ok(user);
  };

  createUser = async (req: Request, res: Response) => {
    console.log('req.body', req.body);
    const { name, email, password,role } = req.body;
    const user = await  this._userService.createUser(name, email, password,role);
    console.log('user', user);
    res.create(user);
  };


  deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const deleted = this._userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.ok({});
  };

 getCurrentUser = (req: Request, res: Response) => {
  console.log('req.user', req.user);
  const user = req.user;  
  if (!user) {
    throw new CustomError('User does not exist', 'USER', 404);  
  }
     res.ok(user);

};

// Update user profile
 updateUser = async (req: Request, res: Response) => {
  console.log('update.user', req.user);
  if (!req.user) {
    throw new CustomError('Unauthenticated', 'USER', 401);
  }
  const userId = req.user.id
  const { name, email, role } = req.body;
  const updatedUser = await userService.updateUser(userId, { name, email, role });
  if (!updatedUser) {
    throw new CustomError('User not found', 'USER', 404);
  }

  res.json(updatedUser);
};

// Create a COACH user
createCoachUser = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new CustomError('Unauthenticated', 'USER', 401);
  }
  if (req.user.role !== 'ADMIN') {
    throw new CustomError('Unauthorized', 'USER', 403);
  }

  const { name, email, password } = req.body;
  const newCoach = await userService.createUser(name, email, password, 'COACH');
  res.status(201).json(newCoach);
};
}
