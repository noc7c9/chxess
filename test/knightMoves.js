import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('knight moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wNd4'],
        square: 'd4',
        expected: 'Nb3 Nb5 Nc2 Nc6 Ne2 Ne6 Nf3 Nf5',
})

test('knight moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wNa1'],
        square: 'a1',
        expected: 'Nb3 Nc2',
})

test('knight moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wNh1'],
        square: 'h1',
        expected: 'Nf2 Ng3',
})

test('knight moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wNa8'],
        square: 'a8',
        expected: 'Nb6 Nc7',
})

test('knight moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wNh8'],
        square: 'h8',
        expected: 'Nf7 Ng6',
})


test('white knight has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wNd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
})

test('black knight has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bNd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
})

test('knight is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wc6', 'we6', 'wNd4', 'wb3', 'we2'],
        square: 'd4',
        expected: 'Nb5 Nc2 Nf3 Nf5',
})
