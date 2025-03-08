'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.transformRoleToEnumRole = transformRoleToEnumRole;
const client_1 = require('@prisma/client');
function transformRoleToEnumRole(role) {
  switch (role) {
    case 'ADMIN':
      return client_1.Roles.ADMIN;
    default:
      return client_1.Roles.USER;
  }
}
