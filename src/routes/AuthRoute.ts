import { Router } from 'express';

import {registerValidation, loginValidation } from '../validations/AuthValidation';
import validate from '$validations/validation';
import { authenticate } from '$utils/jwt.utils';
import authController from '$controllers/rest/AuthController';

const authRoute = Router({ mergeParams: true });

authRoute.post('/register', validate(registerValidation), authController.register);
authRoute.post('/login', validate(loginValidation), authController.login);
authRoute.get('/me', authenticate, authController.me);

export default authRoute;
