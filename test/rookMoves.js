import test from 'ava';
import {moveGenerationMacro} from './_helpers';

test('rook moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wRd4'],
        square: 'd4',
        expected: `Rd4-a4 Rd4-b4 Rd4-c4 Rd4-e4 Rd4-f4 Rd4-g4 Rd4-h4 Rd4-d1
            Rd4-d2 Rd4-d3 Rd4-d5 Rd4-d6 Rd4-d7 Rd4-d8`,
    });

test('rook moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wRa1'],
        square: 'a1',
        expected: `Ra1-b1 Ra1-c1 Ra1-d1 Ra1-e1 Ra1-f1 Ra1-g1 Ra1-h1 Ra1-a2
            Ra1-a3 Ra1-a4 Ra1-a5 Ra1-a6 Ra1-a7 Ra1-a8`,
    });

test('rook moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wRh1'],
        square: 'h1',
        expected: `Rh1-a1 Rh1-b1 Rh1-c1 Rh1-d1 Rh1-e1 Rh1-f1 Rh1-g1 Rh1-h2
            Rh1-h3 Rh1-h4 Rh1-h5 Rh1-h6 Rh1-h7 Rh1-h8`,
    });

test('rook moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wRa8'],
        square: 'a8',
        expected: `Ra8-b8 Ra8-c8 Ra8-d8 Ra8-e8 Ra8-f8 Ra8-g8 Ra8-h8 Ra8-a1
            Ra8-a2 Ra8-a3 Ra8-a4 Ra8-a5 Ra8-a6 Ra8-a7`,
    });

test('rook moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wRh8'],
        square: 'h8',
        expected: `Rh8-a8 Rh8-b8 Rh8-c8 Rh8-d8 Rh8-e8 Rh8-f8 Rh8-g8 Rh8-h1
            Rh8-h2 Rh8-h3 Rh8-h4 Rh8-h5 Rh8-h6 Rh8-h7`,
    });


test('white rook has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wRd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
    });

test('black rook has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bRd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
    });

test('rook is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wd7', 'wb4', 'wRd4', 'wh4', 'wd3'],
        square: 'd4',
        expected: 'Rd4-c4 Rd4-d5 Rd4-d6 Rd4-e4 Rd4-f4 Rd4-g4',
    });

test('rook capturing moves',
    moveGenerationMacro, {
        board: ['bc4', 'bd2', 'bd7', 'bh4', 'wRd4'],
        square: 'd4',
        expected: `Rd4-d3 Rd4-d5 Rd4-d6 Rd4-e4 Rd4-f4 Rd4-g4 Rd4xc4 Rd4xd2
            Rd4xd7 Rd4xh4`,
    });
