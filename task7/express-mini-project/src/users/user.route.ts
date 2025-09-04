import { Router } from 'express';
import { UserController } from './user.controller';
import { isAuthenticated } from '../shared/middlewares/auth.middleware';
 // Assume we have auth middleware

console.log('UserController',UserController);
const router = Router();
const userController = new UserController();

///router.use(isAuthenticated);  // Make sure the user is authenticated before accessing user routes

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export const userRouter = router;
