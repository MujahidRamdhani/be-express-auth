'use strict';
// src/middlewares/authMiddleware.ts
Object.defineProperty(exports, '__esModule', { value: true });
exports.authenticate = authenticate;
/// <reference path="../@types/express.d.ts" />
const jwt_utils_1 = require('$utils/jwt.utils');
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  try {
    const user = await (0, jwt_utils_1.verifyAccessToken)(token);
    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to authenticate user', error: err });
  }
}
