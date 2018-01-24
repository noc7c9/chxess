import test from 'ava'
import {Chxess} from '../build/chxess'

test('initial board layout is correct', t => {
    const chx = new Chxess()

    const initialLayout = [
        [ 'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR', ],
        [ 'b',  'b',  'b',  'b',  'b',  'b',  'b',  'b',  ],
        [ '',   '',   '',   '',   '',   '',   '',   '',   ],
        [ '',   '',   '',   '',   '',   '',   '',   '',   ],
        [ '',   '',   '',   '',   '',   '',   '',   '',   ],
        [ '',   '',   '',   '',   '',   '',   '',   '',   ],
        [ 'w',  'w',  'w',  'w',  'w',  'w',  'w',  'w',  ],
        [ 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR', ],
    ]

    t.deepEqual(initialLayout, chx.getBoard())
})

test('setting the board', t => {
    const chx = new Chxess()

    const layout = [
        ['',   '',   'b',  '',   'b',  'wQ', 'bQ', '',   ],
        ['',   'b',  '',   'wR', '',   '',   'b',  '',   ],
        ['wB', 'bK', '',   'b',  '',   '',   'w',  'bR', ],
        ['w',  'wN', 'b',  'bB', 'w',  '',   'b',  '',   ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'b',  '',   ],
        ['',   'bB', 'wK', '',   'w',  '',   '',   '',   ],
        ['',   '',   'w',  '',   '',   '',   'w',  '',   ],
        ['w',  '',   '',   'bR', 'bN', 'w',  'bN', '',   ],
    ]

    // set the board to a random layout
    chx.setBoard(layout)

    // make sure the board layout was actually set
    t.deepEqual(layout, chx.getBoard())
})

test('setting the board via constructor', t => {
    const layout = [
        ['',   '',   'b',  '',   'b',  'wQ', 'bQ', '',   ],
        ['',   'b',  '',   'wR', '',   '',   'b',  '',   ],
        ['wB', 'bK', '',   'b',  '',   '',   'w',  'bR', ],
        ['w',  'wN', 'b',  'bB', 'w',  '',   'b',  '',   ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'b',  '',   ],
        ['',   'bB', 'wK', '',   'w',  '',   '',   '',   ],
        ['',   '',   'w',  '',   '',   '',   'w',  '',   ],
        ['w',  '',   '',   'bR', 'bN', 'w',  'bN', '',   ],
    ]

    // set the board using the constructor
    const chx = new Chxess(layout);

    // make sure the board layout was actually set
    t.deepEqual(layout, chx.getBoard())
})

test('clearing the board', t => {
    const chx = new Chxess()

    const expectedLayout = [
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', ],
    ]

    chx.clearBoard()

    t.deepEqual(expectedLayout, chx.getBoard())
})

test('getBoard and setBoard use same format', t => {
    const chx = new Chxess()
    const originalLayout = [
        ['',   '',   'b',  '',   'b',  'wQ', 'bQ', '',   ],
        ['',   'b',  '',   'wR', '',   '',   'b',  '',   ],
        ['wB', 'bK', '',   'b',  '',   '',   'w',  'bR', ],
        ['w',  'wN', 'b',  'bB', 'w',  '',   'b',  '',   ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'b',  '',   ],
        ['',   'bB', 'wK', '',   'w',  '',   '',   '',   ],
        ['',   '',   'w',  '',   '',   '',   'w',  '',   ],
        ['w',  '',   '',   'bR', 'bN', 'w',  'bN', '',   ],
    ]
    chx.setBoard(originalLayout)

    const exportedLayout = chx.getBoard();

    chx.clearBoard()
    chx.setBoard(exportedLayout)

    t.deepEqual(originalLayout, chx.getBoard())
})


test('getting arbitrary squares', t => {
    const chx = new Chxess()

    const layout = [
        ['',   '',   'b',  '',   'b',  'wQ', 'bQ', '',   ],
        ['',   'b',  '',   'wR', '',   '',   'b',  '',   ],
        ['wB', 'bK', '',   'b',  '',   '',   'w',  'bR', ],
        ['w',  'wN', 'b',  'bB', 'w',  '',   'b',  '',   ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'b',  '',   ],
        ['',   'bB', 'wK', '',   'w',  '',   '',   '',   ],
        ['',   '',   'w',  '',   '',   '',   'w',  '',   ],
        ['w',  '',   '',   'bR', 'bN', 'w',  'bN', '',   ],
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
        ['',   '',   'b',  '',   'b',  'wQ', 'bQ', '',   ],
        ['',   'b',  '',   'wR', '',   '',   'b',  '',   ],
        ['wB', 'bK', '',   'b',  '',   '',   'w',  'bR', ],
        ['w',  'wN', 'b',  'bB', 'w',  '',   'b',  '',   ],
        ['',   '',   '',   'wN', 'wR', 'wB', 'b',  '',   ],
        ['',   'bB', 'wK', '',   'w',  '',   '',   '',   ],
        ['',   '',   'w',  '',   '',   '',   'w',  '',   ],
        ['w',  '',   '',   'bR', 'bN', 'w',  'bN', '',   ],
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
