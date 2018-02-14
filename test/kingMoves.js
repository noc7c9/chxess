import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('king moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wKd4'],
        square: 'd4',
        expected: `Kd4-c3 Kd4-c4 Kd4-c5 Kd4-d3 Kd4-d5 Kd4-e3 Kd4-e4 Kd4-e5`,
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
        expected: `Kd4-c3 Kd4-c4 Kd4-d5 Kd4-e3`,
})

test('king capturing moves',
    moveGenerationMacro, {
        board: ['bc3', 'bd5', 'be5', 'wKd4'],
        square: 'd4',
        expected: `Kd4-c4 Kd4-c5 Kd4-d3 Kd4-e3 Kd4-e4 Kd4xc3 Kd4xd5 Kd4xe5`,
})
