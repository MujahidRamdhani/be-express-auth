'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.INVALID_ID_SERVICE_RESPONSE = exports.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE = void 0;
exports.BadRequestWithMessage = BadRequestWithMessage;
exports.INTERNAL_SERVER_ERROR_SERVICE_RESPONSE = {
  status: false,
  err: {
    message: 'Internal Server Error',
    code: 500,
  },
};
exports.INVALID_ID_SERVICE_RESPONSE = {
  status: false,
  data: {}, // empty object to match the expected data structure
  err: {
    message: 'Invalid ID, Data not Found',
    code: 404,
  },
};
function BadRequestWithMessage(message) {
  return {
    status: false,
    data: {},
    err: {
      message,
      code: 404,
    },
  };
}
