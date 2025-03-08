import { Request, Response } from 'express';
import * as FileService from '$services/FileService';
import { handleServiceErrorWithResponse, response_success } from '$utils/response.utils';
import { User } from '@prisma/client';

export async function create(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;
  const fileData = req.body;

  const serviceResponse = await FileService.create(userId, fileData);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'File uploaded successfully!');
}

export async function getByUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;

  const serviceResponse = await FileService.getByUserId(userId);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'Files retrieved successfully!');
}
