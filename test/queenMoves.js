import test from 'ava';
import {moveGenerationMacro} from './_helpers';

test('queen moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wQd4'],
        square: 'd4',
        expected: `Qd4-a1 Qd4-a4 Qd4-a7 Qd4-b2 Qd4-b4 Qd4-b6 Qd4-c3 Qd4-c4
            Qd4-c5 Qd4-d1 Qd4-d2 Qd4-d3 Qd4-d5 Qd4-d6 Qd4-d7 Qd4-d8 Qd4-e3
            Qd4-e4 Qd4-e5 Qd4-f2 Qd4-f4 Qd4-f6 Qd4-g1 Qd4-g4 Qd4-g7 Qd4-h4
            Qd4-h8`,
    });


test('white queen has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wQd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
    });

test('black queen has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bQd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
    });

test('queen is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wd8', 'wa7', 'we5', 'wc4', 'wQd4', 'wg4', 'wd2', 'wf2', 'wa1'],
        square: 'd4',
        expected: `Qd4-b2 Qd4-b6 Qd4-c3 Qd4-c5 Qd4-d3 Qd4-d5 Qd4-d6 Qd4-d7
            Qd4-e3 Qd4-e4 Qd4-f4`,
    });

test('queen capturing moves',
    moveGenerationMacro, {
        board: ['bb2', 'bb4', 'bb6', 'bd3', 'bd7', 'bg1', 'bh4', 'bh8', 'wQd4'],
        square: 'd4',
        expected: `Qd4-c3 Qd4-c4 Qd4-c5 Qd4-d5 Qd4-d6 Qd4-e3 Qd4-e4 Qd4-e5
            Qd4-f2 Qd4-f4 Qd4-f6 Qd4-g4 Qd4-g7 Qd4xb2 Qd4xb4 Qd4xb6 Qd4xd3
            Qd4xd7 Qd4xg1 Qd4xh4 Qd4xh8`,
    });
