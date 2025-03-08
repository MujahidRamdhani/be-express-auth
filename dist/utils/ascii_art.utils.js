'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.REST_ASCII_ART = void 0;
exports.displayAsciiArt = displayAsciiArt;
exports.REST_ASCII_ART = `
  __  __ _    _       _     _ 
 |  \/  (_)  (_)     (_)   | |
 | \  / |_    _  __ _ _  __| |
 | |\/| | |  | |/ _' | |/ _' |
 | |  | | |  | | (_| | | (_| |
 |_|  |_|_|  |_|\__,_|_|\__,_|
_|"""""|_|"""""|_|"""""|_|"""""|
"'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'
`;
function displayAsciiArt(ascii_art) {
  console.log('\x1b[32m%s\x1b[0m', ascii_art);
}
