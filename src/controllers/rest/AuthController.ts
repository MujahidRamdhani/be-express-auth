import { Request, Response } from 'express';
import { handleServiceErrorWithResponse, response_success } from '../../utils/response.utils';
import { User } from '@prisma/client';
import authService from '$services/AuthSevice';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '$utils/jwt.utils';

async function register(req: Request, res: Response): Promise<Response> {
  const { fullName, email, password } = req.body;

  const serviceResponse = await authService.register({ fullName, password, email });

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Registration successful!');
}

async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  const serviceResponse = await authService.login({ email, password });

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Login successful!');
}

async function me(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;

  const serviceResponse = await authService.me(userId);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'User profile fetched successfully!');
}

export async function refreshToken(req: Request, res: Response): Promise<Response> {
  const { oldRefreshToken } = req.body;

  if (!oldRefreshToken) {
    return handleServiceErrorWithResponse(res, {
      status: false,
      err: { message: 'No refresh token provided', code: 401 },
    });
  }

  const user = verifyRefreshToken(oldRefreshToken);
  if (!user) {
    return handleServiceErrorWithResponse(res, {
      status: false,
      err: { message: 'Invalid or expired refresh token', code: 403 },
    });
  }

  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  return response_success(res, { accessToken: newAccessToken, refreshToken: newRefreshToken }, 'Token refreshed successfully!');
}

const authController = {
  register,
  login,
  me,
  refreshToken,
};
export default authController;
