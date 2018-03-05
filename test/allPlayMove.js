import test from 'ava'
import {playMoveMacro, createBoard} from './_helpers'

test('move playing',
    playMoveMacro, {
        board: ['wRd4'],
        moves: ['rd4-d6'],
        expected: ['wRd6'],
})

test('move playing changes turn', (t) => {
    const chx = createBoard(['wRd4'], 'w');

    t.deepEqual(chx.getTurn(), 'w');

    chx.playMove('rd4-d6');
    t.deepEqual(chx.getTurn(), 'b');
})

test('white can\'t move black pieces',
    playMoveMacro, {
        board: ['bRd4'],
        turn: 'w',
        moves: ['rd4-d6'],
        expected: ['bRd4'],
})

test('black can\'t move white pieces',
    playMoveMacro, {
        board: ['wRd4'],
        turn: 'b',
        moves: ['rd4-d6'],
        expected: ['wRd4'],
})

test('playing an invalid move doesn\'t change the board',
    playMoveMacro, {
        board: ['wRd4'],
        moves: ['rd4-e5'],
        expected: ['wRd4'],
})

test('playing an empty square is invalid',
    playMoveMacro, {
        board: ['wRd4'],
        moves: ['re4-e5'],
        expected: ['wRd4'],
})

test('playMove returns true/false based on success', (t) => {
    const chx = createBoard(['wRd4', 'bRe5'], 'w');

    // white plays valid move
    t.true(chx.playMove('rd4-d6'));

    // black tries to move white piece
    t.false(chx.playMove('rd6-d4'));

    // black plays valid move
    t.true(chx.playMove('re5-e3'));

    // white tries to move black piece
    t.false(chx.playMove('re3-e5'));

    // white tries to play an invalid move
    t.false(chx.playMove('rd6-c7'));
})
