import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('white pawn moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wd4'],
        square: 'd4',
        expected: 'd5',
})

test('black pawn moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['bd4'],
        turn: 'b',
        square: 'd4',
        expected: 'd3',
})

test('white pawn move from starting rank of an empty board',
    moveGenerationMacro, {
        board: ['wd2'],
        square: 'd2',
        expected: 'd3 d4',
})

test('black pawn move from starting rank of an empty board',
    moveGenerationMacro, {
        board: ['bd7'],
        turn: 'b',
        square: 'd7',
        expected: 'd5 d6',
})


test('white pawn has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
})

test('black pawn has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
})

test('pawn single push is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wd5', 'wd4'],
        square: 'd4',
        expected: '',
})

test('pawn double push is blocked by friendly pieces on target square',
    moveGenerationMacro, {
        board: ['wc4', 'wc2'],
        square: 'c2',
        expected: 'c3',
})

test('pawn double push is blocked by friendly pieces on square in front',
    moveGenerationMacro, {
        board: ['wc3', 'wc2'],
        square: 'c2',
        expected: '',
})
