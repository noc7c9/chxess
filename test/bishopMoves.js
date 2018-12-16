import test from 'ava';
import {moveGenerationMacro} from './_helpers';

test('bishop moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wBd4'],
        square: 'd4',
        expected: `Bd4-a1 Bd4-a7 Bd4-b2 Bd4-b6 Bd4-c3 Bd4-c5 Bd4-e3 Bd4-e5
            Bd4-f2 Bd4-f6 Bd4-g1 Bd4-g7 Bd4-h8`,
    });

test('bishop moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wBa1'],
        square: 'a1',
        expected: 'Ba1-b2 Ba1-c3 Ba1-d4 Ba1-e5 Ba1-f6 Ba1-g7 Ba1-h8',
    });

test('bishop moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wBh1'],
        square: 'h1',
        expected: 'Bh1-a8 Bh1-b7 Bh1-c6 Bh1-d5 Bh1-e4 Bh1-f3 Bh1-g2',
    });

test('bishop moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wBa8'],
        square: 'a8',
        expected: 'Ba8-b7 Ba8-c6 Ba8-d5 Ba8-e4 Ba8-f3 Ba8-g2 Ba8-h1',
    });

test('bishop moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wBh8'],
        square: 'h8',
        expected: 'Bh8-a1 Bh8-b2 Bh8-c3 Bh8-d4 Bh8-e5 Bh8-f6 Bh8-g7',
    });


test('white bishop has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wBd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
    });

test('black bishop has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bBd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
    });

test('bishop is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wh8', 'wb6', 'wBd4', 'we3', 'wa1'],
        square: 'd4',
        expected: 'Bd4-b2 Bd4-c3 Bd4-c5 Bd4-e5 Bd4-f6 Bd4-g7',
    });

test('bishop capturing moves',
    moveGenerationMacro, {
        board: ['ba7', 'bb2', 'be3', 'bh8', 'wBd4'],
        square: 'd4',
        expected: `Bd4-b6 Bd4-c3 Bd4-c5 Bd4-e5 Bd4-f6 Bd4-g7 Bd4xa7 Bd4xb2
            Bd4xe3 Bd4xh8`,
    });
