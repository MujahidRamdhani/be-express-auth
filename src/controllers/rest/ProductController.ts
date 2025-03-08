import { Request, Response } from 'express';
import * as ProductService from '$services/ProductService';
import { handleServiceErrorWithResponse, response_success } from '$utils/response.utils';
import { User } from '@prisma/client';
import { buildFilters, parseQueryParam } from '$utils/query.utils';

export async function create(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;
  const productData = req.body;

  const serviceResponse = await ProductService.create(userId, productData);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'Product created successfully!');
}

export async function getByUserId(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;

  const serviceResponse = await ProductService.getByUserId(userId);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'Products retrieved successfully!');
}

export async function getAll(req: Request, res: Response): Promise<Response> {
  const filtersFromQuery = req.query.filters ? JSON.parse(req.query.filters as string) : {};
  const filters = buildFilters(req.query, filtersFromQuery);

  const query = {
    filters,
    page: parseQueryParam(req.query.page, parseInt, 1),
    rows: parseQueryParam(req.query.rows, parseInt, 10),
  };

  const serviceResponse = await ProductService.getAll(query);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Products retrieved successfully!');
}
