'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleServiceErrorWithResponse =
  exports.response_created =
  exports.response_success =
  exports.response_internal_server_error =
  exports.response_unprocessable_entity =
  exports.response_conflict =
  exports.response_not_found =
  exports.response_forbidden =
  exports.response_unauthorized =
  exports.response_bad_request =
  exports.response_handler =
    void 0;
/**
 * Base of response handler
 * Note: `should not be used in controller`
 * @param res     - response object passed by express
 * @param status  - status code of a response
 * @param content - the response data
 * @param message - description of a response
 * @param errors  - list of errors if any
 * @returns response
 */
const response_handler = (res, status, content = null, message = '', errors = []) => {
  return res.status(status).json({ content, message, errors });
};
exports.response_handler = response_handler;
/**
 * Bad Request :
 * The server could not understand the request due to invalid syntax
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_bad_request = (res, message = 'Bad Request', errors = []) => {
  return (0, exports.response_handler)(res, 400, undefined, message, errors);
};
exports.response_bad_request = response_bad_request;
/**
 * Unauthorized :
 * The client must authenticate itself to get the requested response
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_unauthorized = (res, message = 'Unauthorized', errors = []) => {
  return (0, exports.response_handler)(res, 401, undefined, message, errors);
};
exports.response_unauthorized = response_unauthorized;
/**
 * Forbidden :
 * The client does not have access rights to the content
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_forbidden = (res, message = 'Forbidden', errors = []) => {
  return (0, exports.response_handler)(res, 403, undefined, message, errors);
};
exports.response_forbidden = response_forbidden;
/**
 * Not Found
 * The server can not find the requested resource
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_not_found = (res, message = 'Not Found', errors = []) => {
  return (0, exports.response_handler)(res, 404, undefined, message, errors);
};
exports.response_not_found = response_not_found;
/**
 * Conflict
 * This response is sent when a request conflicts with the current state of the server
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_conflict = (res, message = 'Conflict', errors = []) => {
  return (0, exports.response_handler)(res, 409, undefined, message, errors);
};
exports.response_conflict = response_conflict;
/**
 * Unprocessable Entity
 * The request was well-formed but was unable to be followed due to semantic errors
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_unprocessable_entity = (res, message = 'Unprocessable Entity', errors = []) => {
  return (0, exports.response_handler)(res, 422, undefined, message, errors);
};
exports.response_unprocessable_entity = response_unprocessable_entity;
/**
 * Internal Server Error
 * The server encountered an unexpected condition that prevented it from fulfilling the request
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_internal_server_error = (res, message = 'Internal Server Error', errors = []) => {
  return (0, exports.response_handler)(res, 500, undefined, message, errors);
};
exports.response_internal_server_error = response_internal_server_error;
/**
 * Ok
 * The request has succeeded
 * @param res response object
 * @param content response data
 * @param message description
 */
const response_success = (res, content = null, message = 'Success') => {
  return (0, exports.response_handler)(res, 200, content, message, undefined);
};
exports.response_success = response_success;
/**
 * Created
 * The request has succeeded and a new resource has been created as a result
 * @param res response object
 * @param content response data
 * @param message description
 */
const response_created = (res, content = null, message = 'Created') => {
  return (0, exports.response_handler)(res, 201, content, message, undefined);
};
exports.response_created = response_created;
const handleServiceErrorWithResponse = (res, serviceResponse) => {
  switch (serviceResponse.err?.code) {
    case 400:
      return (0, exports.response_bad_request)(res, serviceResponse.err?.message);
    case 404:
      return (0, exports.response_not_found)(res, serviceResponse.err?.message);
    case 401:
      return (0, exports.response_unauthorized)(res, serviceResponse.err?.message);
    default:
      return (0, exports.response_internal_server_error)(res, serviceResponse.err?.message);
  }
};
exports.handleServiceErrorWithResponse = handleServiceErrorWithResponse;
