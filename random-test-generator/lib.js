function pieceToString(piece) {
    if (piece) {
        return piece.color + piece.type.replace('p', '')
    }
    return '__'
}

exports.output = function (chess) {
    const ranks = '87654321';
    const files = 'abcdefgh';
    const fen = chess.fen();
    const moves = chess.moves().join(' ');
    const board = chess.board()
        .map((rank, r) => {
            // console.log('rank:', ranks[r], rank.map(pieceToString).join(', '))
            return rank
                .map((piece, f) => {
                    if (piece) {
                        // console.log('   ', piece.color + piece.type.replace('p', '') + files[f] + ranks[r])
                        return pieceToString(piece) + files[f] + ranks[r];
                    }
                    return null
                })
                .filter((v) => v != null)
        })
        .reduce(function (acc, val) {
            return acc.concat(val)
        })

    console.log(`
    test('random placement: ${fen}',
        moveGenerationMacro, {
            board: [${board.map((v) => `'${v}'`).join(', ')}],
            turn: '${chess.turn()}',
            expected: \`${moves}\`,
    })
    `.trim());
}
