import { Request, Response } from 'express';
import { userService } from './user.service';

export class UserController {
  private _userService = userService;

  getUsers = (
    req: Request<{}, {}, {}, { page: string; limit: string }>,
    res: Response
  ) => {
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

  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const { name, email,role } = req.body;
    const user = this._userService.updateUser(id, name, email,role);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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
}
