import { RequestHandler, Router } from 'express';

import { authController } from './auth.controller';

const router = Router();
// Post /api/auth -create user 
router.post('/register', authController.register.bind(authController) as RequestHandler);


router.post('/login',
     authController.login.bind(authController) as RequestHandler);
router.post('/logout', authController.logout);

export const authRouter = router;
