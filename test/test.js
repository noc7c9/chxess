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

    chx.setBoard(layout)

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
