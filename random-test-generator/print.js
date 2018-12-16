const {Chess} = require('./chess.min.js');
const {output} = require('./lib.js');

const inputfen = process.argv[2];
console.log(inputfen);

const chess = new Chess(inputfen);
console.log(chess.ascii());

output(chess);
