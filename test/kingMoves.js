import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('king moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wKd4'],
        square: 'd4',
        expected: 'Kc3 Kc4 Kc5 Kd3 Kd5 Ke3 Ke4 Ke5',
})


test('white king has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wKd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
})

test('black king has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bKd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
})

test('king is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wc5', 'we5', 'wKd4', 'we4', 'wd3'],
        square: 'd4',
        expected: 'Kc3 Kc4 Kd5 Ke3',
})
