import test from 'ava'
import {moveGenerationTest} from './_helpers'
import {Chxess} from '../build/chxess'

test('king moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()
    chx.setSquare('d4', 'wK')
    moveGenerationTest(t, chx, 'd4',
        'Kc3 Kc4 Kc5 Kd3 Kd5 Ke3 Ke4 Ke5')
})
