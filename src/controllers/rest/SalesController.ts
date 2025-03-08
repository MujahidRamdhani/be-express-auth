import { Request, Response } from 'express';
import * as SalesService from '$services/SalesService';
import { handleServiceErrorWithResponse, response_success } from '$utils/response.utils';
import { User } from '@prisma/client';
import { buildFilters } from '$utils/query.utils';
import { parseQueryParam } from '$utils/queryProduct.utis';

// Create Sales Record
export async function create(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;
  const salesData = req.body;
  const serviceResponse = await SalesService.create(userId, salesData);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'Sales record created successfully!');
}

// Get Sales by User ID
export async function getByUserId(req: Request, res: Response): Promise<Response> {
  const { id } = req.user as User;
  const userId = id;

  const serviceResponse = await SalesService.getSalesByUserId(userId);

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse);

  return response_success(res, serviceResponse.data, 'Sales records retrieved successfully!');
}

export async function getAll(req: Request, res: Response): Promise<Response> {
  const filtersFromQuery = req.query.filters ? JSON.parse(req.query.filters as string) : {};
  const filters = buildFilters(req.query, filtersFromQuery);

  const query = {
    filters,
    page: parseQueryParam(req.query.page, parseInt, 1),
    rows: parseQueryParam(req.query.rows, parseInt, 10),
  };

  const serviceResponse = await SalesService.getAll(query);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'All sales records retrieved successfully!');
}
