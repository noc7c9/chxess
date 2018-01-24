import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('king moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wKd4'],
        square: 'd4',
        expected: 'Kc3 Kc4 Kc5 Kd3 Kd5 Ke3 Ke4 Ke5',
})
