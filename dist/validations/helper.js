'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateErrorStructure = generateErrorStructure;
function generateErrorStructure(field, message) {
  return {
    field,
    message,
  };
}
