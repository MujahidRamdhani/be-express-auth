'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createAccessToken = createAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const logger_1 = __importDefault(require('../pkg/logger'));
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
function createAccessToken(payload) {
  try {
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  } catch (err) {
    logger_1.default.error(`createAccessToken: Failed to create token - ${err}`);
    throw new Error('Failed to create token');
  }
}
async function verifyAccessToken(token) {
  try {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    logger_1.default.error(`verifyAccessToken: Invalid token - ${err}`);
    return null;
  }
}
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  const user = await verifyAccessToken(token);
  if (!user) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
  req.user = user;
  next();
}
