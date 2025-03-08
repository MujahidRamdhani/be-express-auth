'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const validate = (schema, request) => {
  const options = {
    abortEarly: false,
    allowUnknown: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  };
  const result = schema.validate(request, options);
  if (result.error) {
    throw result.error;
  } else {
    return result.value;
  }
};
exports.default = validate;
