import { Router } from 'express';
import { UserController } from './user.controller';
import { isAuthenticated } from '../shared/middlewares/auth.middleware';
 // Assume we have auth middleware

console.log('UserController',UserController);
const router = Router();
const userController = new UserController();

///router.use(isAuthenticated);  

router.get('/', userController.getUsers);

// router.delete('/:id', userController.deleteUser);
router.get('/me', isAuthenticated, userController.getCurrentUser); 
router.put('/me', isAuthenticated, userController.updateUser);     
router.post('/coach', isAuthenticated,userController.createCoachUser); 
export const userRouter = router;
