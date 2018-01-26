import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('rook moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wRd4'],
        square: 'd4',
        expected: 'Ra4 Rb4 Rc4 Re4 Rf4 Rg4 Rh4 Rd1 Rd2 Rd3 Rd5 Rd6 Rd7 Rd8',
})

test('rook moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wRa1'],
        square: 'a1',
        expected: 'Rb1 Rc1 Rd1 Re1 Rf1 Rg1 Rh1 Ra2 Ra3 Ra4 Ra5 Ra6 Ra7 Ra8',
})

test('rook moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wRh1'],
        square: 'h1',
        expected: 'Ra1 Rb1 Rc1 Rd1 Re1 Rf1 Rg1 Rh2 Rh3 Rh4 Rh5 Rh6 Rh7 Rh8',
})

test('rook moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wRa8'],
        square: 'a8',
        expected: 'Rb8 Rc8 Rd8 Re8 Rf8 Rg8 Rh8 Ra1 Ra2 Ra3 Ra4 Ra5 Ra6 Ra7',
})

test('rook moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wRh8'],
        square: 'h8',
        expected: 'Ra8 Rb8 Rc8 Rd8 Re8 Rf8 Rg8 Rh1 Rh2 Rh3 Rh4 Rh5 Rh6 Rh7',
})


test('white rook has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wRd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
})

test('black rook has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bRd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
})

test('rook is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wd7', 'wb4', 'wRd4', 'wh4', 'wd3'],
        square: 'd4',
        expected: 'Rc4 Rd5 Rd6 Re4 Rf4 Rg4',
})
