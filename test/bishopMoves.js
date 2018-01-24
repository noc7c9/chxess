import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('bishop moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wBd4'],
        square: 'd4',
        expected: 'Ba1 Ba7 Bb2 Bb6 Bc3 Bc5 Be3 Be5 Bf2 Bf6 Bg1 Bg7 Bh8',
})

test('bishop moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wBa1'],
        square: 'a1',
        expected: 'Bb2 Bc3 Bd4 Be5 Bf6 Bg7 Bh8',
})

test('bishop moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wBh1'],
        square: 'h1',
        expected: 'Ba8 Bb7 Bc6 Bd5 Be4 Bf3 Bg2',
})

test('bishop moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wBa8'],
        square: 'a8',
        expected: 'Bb7 Bc6 Bd5 Be4 Bf3 Bg2 Bh1',
})

test('bishop moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wBh8'],
        square: 'h8',
        expected: 'Ba1 Bb2 Bc3 Bd4 Be5 Bf6 Bg7',
})
