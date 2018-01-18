import test from 'ava'
import {Chxess} from '../build/chxess'

test('initial board layout is correct', t => {
    const chx = new Chxess()

    const initialLayout = [
        [ 'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR' ],
        [ 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP' ],
        [ '',   '',   '',   '',   '',   '',   '',   '' ],
        [ '',   '',   '',   '',   '',   '',   '',   '' ],
        [ '',   '',   '',   '',   '',   '',   '',   '' ],
        [ '',   '',   '',   '',   '',   '',   '',   '' ],
        [ 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP' ],
        [ 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR' ],
    ]

    t.deepEqual(initialLayout, chx.getBoard())
})

test('setting the board', t => {
    const chx = new Chxess()

    const layout = [
        ['',   '',   'bP', '',   'bP', 'wQ', 'bQ', '' ],
        ['',   'bP', '',   'wR', '',   '',   'bP', '' ],
        ['wB', 'bK', '',   'bP', '',   '',   'wP', 'bR' ],
        ['wP', 'wN', 'bP', 'bB', 'wP', '',   'bP', '' ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'bP', '' ],
        ['',   'bB', 'wK', '',   'wP', '',   '',   '' ],
        ['',   '',   'wP', '',   '',   '',   'wP', '' ],
        ['wP', '',   '',   'bR', 'bN', 'wP', 'bN', '' ],
    ]

    // set the board to a random layout
    chx.setBoard(layout)

    // make sure the board layout was actually set
    t.deepEqual(layout, chx.getBoard())
})

test('clearing the board', t => {
    const chx = new Chxess()

    const expectedLayout = [
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '', '' ],
    ]

    chx.clearBoard()

    t.deepEqual(expectedLayout, chx.getBoard())
})


test('getting arbitrary squares', t => {
    const chx = new Chxess()

    const layout = [
        ['',   '',   'bP', '',   'bP', 'wQ', 'bQ', '' ],
        ['',   'bP', '',   'wR', '',   '',   'bP', '' ],
        ['wB', 'bK', '',   'bP', '',   '',   'wP', 'bR' ],
        ['wP', 'wN', 'bP', 'bB', 'wP', '',   'bP', '' ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'bP', '' ],
        ['',   'bB', 'wK', '',   'wP', '',   '',   '' ],
        ['',   '',   'wP', '',   '',   '',   'wP', '' ],
        ['wP', '',   '',   'bR', 'bN', 'wP', 'bN', '' ],
    ]

    // start with the board set to a random layout
    chx.setBoard(layout)

    // make sure .getSquare returns the right value for every square
    const indexToRankMap = '87654321';
    const indexToFileMap = 'abcdefgh';
    t.plan(8 * 8);
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const expected = layout[y][x];
            const coord = indexToFileMap[x] + indexToRankMap[y];
            const actual = chx.getSquare(coord);
            t.is(actual, expected);
        }
    }
})


test('setting arbitrary squares', t => {
    const chx = new Chxess()
    // start with an empty board
    chx.clearBoard()

    const layout = [
        ['',   '',   'bP', '',   'bP', 'wQ', 'bQ', '' ],
        ['',   'bP', '',   'wR', '',   '',   'bP', '' ],
        ['wB', 'bK', '',   'bP', '',   '',   'wP', 'bR' ],
        ['wP', 'wN', 'bP', 'bB', 'wP', '',   'bP', '' ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'bP', '' ],
        ['',   'bB', 'wK', '',   'wP', '',   '',   '' ],
        ['',   '',   'wP', '',   '',   '',   'wP', '' ],
        ['wP', '',   '',   'bR', 'bN', 'wP', 'bN', '' ],
    ]

    // manually place every piece according to the layout with .setSquare
    const indexToRankMap = '87654321';
    const indexToFileMap = 'abcdefgh';
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const coord = indexToFileMap[x] + indexToRankMap[y];
            chx.setSquare(coord, layout[y][x]);
        }
    }

    // make sure the layout is as expected
    t.deepEqual(layout, chx.getBoard())
})
