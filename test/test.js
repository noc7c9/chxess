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
    ];

    t.deepEqual(initialLayout, chx.getBoard())
})
