'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
require('./paths');
const instance_1 = __importDefault(require('./app/instance'));
const ascii_art_utils_1 = require('$utils/ascii_art.utils');
const ascii_art_utils_2 = require('./utils/ascii_art.utils');
function parseArguments(args) {
  const parsedArgs = {};
  for (let i = 2; i < args.length; i += 2) {
    const argClean = args[i].replace(/^--/, '');
    const argName = argClean.split('=')[0] || '';
    const argValue = argClean.split('=')[1] || '';
    parsedArgs[argName] = argValue;
  }
  return parsedArgs;
}
const parsedArgs = parseArguments(process.argv);
if (parsedArgs['service'] == 'rest') {
  (0, ascii_art_utils_1.displayAsciiArt)(ascii_art_utils_2.REST_ASCII_ART);
  instance_1.default.restApp();
}
