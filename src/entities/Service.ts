export interface ServiceResponse<T> {
  data?: T;
  err?: ServiceError;
  status: boolean;
  totalCount?: number;
}

interface ServiceError {
  message: string;
  code: number;
}

export const INTERNAL_SERVER_ERROR_SERVICE_RESPONSE: ServiceResponse<{}> = {
  status: false,
  err: {
    message: 'Internal Server Error',
    code: 500,
  },
};

export const INVALID_ID_SERVICE_RESPONSE: ServiceResponse<{}> = {
  status: false,
  data: {}, // empty object to match the expected data structure
  err: {
    message: 'Invalid ID, Data not Found',
    code: 404,
  },
};

export function BadRequestWithMessage(message: string): ServiceResponse<{}> {
  return {
    status: false,
    data: {},
    err: {
      message,
      code: 404,
    },
  };
}
