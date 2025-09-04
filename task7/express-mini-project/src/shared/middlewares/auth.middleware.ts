import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { CustomError } from '../utils/exception';
import { HttpErrorStatus } from '../utils/util.types';
import { userService } from '../../users/user.service';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const jwtToken = authHeader.replace('Bearer ', '');
    console.log("JWT:", jwtToken);

    try {
      const payload = verifyJwt(jwtToken);

      const isUserExist = await userService.isUserIdExist(payload.userId);
      if (isUserExist) {
        next();
        return;
      } else {
        throw new Error('User does not exist');
      }
    } catch (e) {
      console.log(e, 'JWT is wrong or expired');
      return next(new CustomError(
        'Invalid or expired token', 
        "AUTH", 
        HttpErrorStatus.Unauthorized
      ));
    }
  }

  return next(new CustomError(
    'Unauthenticated access', 
    "AUTH", 
    HttpErrorStatus.Unauthorized
  ));
};
