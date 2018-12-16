const {Chess} = require('./chess.min.js');
const {output} = require('./lib.js');

const chess = new Chess();

let hasCheckingMove = false;
for (let i = 0; i < 100 || hasCheckingMove; i++) {
    let moves = chess.moves();
    let move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);

    hasCheckingMove = chess.moves().some((val) => val.indexOf('+') >= 0);
}
console.log(chess.ascii());

output(chess);
