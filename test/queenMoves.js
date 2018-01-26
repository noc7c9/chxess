import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('queen moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wQd4'],
        square: 'd4',
        expected: [
            'Qa1 Qa4 Qa7 Qb2 Qb4 Qb6 Qc3 Qc4 Qc5 Qd1 Qd2 Qd3 Qd5',
            'Qd6 Qd7 Qd8 Qe3 Qe4 Qe5 Qf2 Qf4 Qf6 Qg1 Qg4 Qg7 Qh4 Qh8',
        ],
})


test('white queen has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wQd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
})

test('black queen has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bQd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
})

test('queen is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wd8', 'wa7', 'we5', 'wc4', 'wQd4', 'wg4', 'wd2', 'wf2', 'wa1'],
        square: 'd4',
        expected: 'Qb2 Qb6 Qc3 Qc5 Qd3 Qd5 Qd6 Qd7 Qe3 Qe4 Qf4',
})
