'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.exclude = exclude;
// Exclude keys from user
function exclude(user, ...keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
