'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const luxon_1 = require('luxon');
const winston_1 = __importDefault(require('winston'));
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};
// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
// Tell winston that you want to link the colors
// defined above to the severity levels.
winston_1.default.addColors(colors);
// Chose the aspect of your log customizing the log format.
const format = winston_1.default.format.combine(
  // // Tell Winston that the logs must be colored
  // winston.format.colorize({ all: true }),
  // Add the message timestamp with the preferred format
  winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  // Create custom formatting
  winston_1.default.format.printf((info) => `[${info.timestamp}] [${info.level}] : ${JSON.stringify(info.message, null, 2)}`),
);
// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const todayDate = luxon_1.DateTime.now().setZone('Asia/Jakarta').toISODate();
const folderName = `${todayDate?.split('-')[0]}-${todayDate?.split('-')[1]}`;
const fileName = todayDate;
const transports = [
  // Allow the use the console to print the messages
  new winston_1.default.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new winston_1.default.transports.File({
    filename: `logs/errors/${folderName}/${fileName}.log`,
    level: 'error',
  }),
  new winston_1.default.transports.File({
    filename: `logs/http/${folderName}/${fileName}.log`,
    level: 'http',
  }),
  new winston_1.default.transports.File({
    filename: `logs/info/${folderName}/${fileName}.log`,
    level: 'info',
  }),
  new winston_1.default.transports.File({
    filename: `logs/combined/${folderName}/${fileName}.log`,
  }),
];
// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston_1.default.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
exports.default = Logger;
