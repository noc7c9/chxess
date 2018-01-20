import test from 'ava'
import {moveGenerationTest} from './_helpers'
import {Chxess} from '../build/chxess'

test('queen moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()
    chx.setSquare('d4', 'wQ')
    moveGenerationTest(t, chx, 'd4',
        'Qa1 Qa4 Qa7 Qb2 Qb4 Qb6 Qc3 Qc4 Qc5 Qd1 Qd2 Qd3 Qd5',
        'Qd6 Qd7 Qd8 Qe3 Qe4 Qe5 Qf2 Qf4 Qf6 Qg1 Qg4 Qg7 Qh4 Qh8')
})
