import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/exception';
export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new CustomError('User not authenticated', 'AUTH', 401));
    }
    if (!allowedRoles.includes(user.role)) {
      return next(new CustomError('Forbidden', 'AUTH', 403));
    }
    next();
  };
};