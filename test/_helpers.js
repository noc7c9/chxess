import {Chxess} from '../build/chxess'

export function createBoard(board, turn) {
    const chx = new Chxess()

    if (turn) {
        chx.setTurn(turn);
    }

    if (Array.isArray(board) && Array.isArray(board[0])) {
        // is it an entire board layout?
        chx.setBoard(board)
    } else {
        // otherwise assume its an array of pieces to place on an empty board
        chx.clearBoard()
        const regex = /([wb][rbnkq]?)([abcdefgh][12345678])/i
        for (let pieceCode of board) {
            const matches = regex.exec(pieceCode.trim())
            if (matches) {
                const [_, piece, square] = matches
                chx.setSquare(square, piece)
            } else {
                throw `Invalid pieceCode: ${pieceCode}`
            }
        }
    }

    return chx
}

export function moveGenerationMacro(t, settings) {
    function parseExpectedMoves(expected) {
        if (!Array.isArray(expected)) {
            expected = [expected]
        }

        // convert from the form ['d f  a', 'c   e  b']
        //           to the form ['a', 'b', 'c', 'd', 'e', 'f']
        return expected
            .map((v) => v.split(' ')) // split each sub array by spaces
            .reduce((a, v) => a.concat(v), []) // flatten the array
            .map((v) => v.trim())
            .filter((v) => v.length > 0) // remove empty strings
            .sort()
    }

    const chx = createBoard(settings.board, settings.turn)
    const expected = parseExpectedMoves(settings.expected)
    const actual = chx.getMoves(settings.square).sort()

    t.deepEqual(actual, expected)
}

export function playMoveMacro(t, settings) {
    function otherTurn(turn) {
        return turn === 'w' ? 'b' : 'w';
    }

    function debug() {
        if (settings.debug) {
            console.log.apply(console, arguments);
        }
    }

    const chx = createBoard(settings.board, settings.turn)
    const expected = createBoard(settings.expected,
        otherTurn(settings.turn)).getBoard();

    for (let move of settings.moves) {
        debug(`--- ${chx.getTurn()}: ${move} ---`);
        debug(chx.toAscii());
        debug(`Move ${chx.playMove(move) ? 'success' : 'failed'}`);
        debug();
    }
    debug('--- final ---');
    debug(chx.toAscii());

    const actual = chx.getBoard();

    t.deepEqual(actual, expected)
}
