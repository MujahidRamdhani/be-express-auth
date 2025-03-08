export const REST_ASCII_ART = `
  __  __ _    _       _     _ 
 |  \/  (_)  (_)     (_)   | |
 | \  / |_    _  __ _ _  __| |
 | |\/| | |  | |/ _' | |/ _' |
 | |  | | |  | | (_| | | (_| |
 |_|  |_|_|  |_|\__,_|_|\__,_|
_|"""""|_|"""""|_|"""""|_|"""""|
"'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'
`;

export function displayAsciiArt(ascii_art: string) {
  console.log('\x1b[32m%s\x1b[0m', ascii_art);
}
