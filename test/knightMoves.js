import test from 'ava';
import {moveGenerationMacro} from './_helpers';

test('knight moves from middle of an empty board',
    moveGenerationMacro, {
        board: ['wNd4'],
        square: 'd4',
        expected: 'Nd4-b3 Nd4-b5 Nd4-c2 Nd4-c6 Nd4-e2 Nd4-e6 Nd4-f3 Nd4-f5',
    });

test('knight moves from the bottom left corner of an empty board',
    moveGenerationMacro, {
        board: ['wNa1'],
        square: 'a1',
        expected: 'Na1-b3 Na1-c2',
    });

test('knight moves from the bottom right corner of an empty board',
    moveGenerationMacro, {
        board: ['wNh1'],
        square: 'h1',
        expected: 'Nh1-f2 Nh1-g3',
    });

test('knight moves from the top left corner of an empty board',
    moveGenerationMacro, {
        board: ['wNa8'],
        square: 'a8',
        expected: 'Na8-b6 Na8-c7',
    });

test('knight moves from the top right corner of an empty board',
    moveGenerationMacro, {
        board: ['wNh8'],
        square: 'h8',
        expected: 'Nh8-f7 Nh8-g6',
    });


test('white knight has no moves on black\'s turn',
    moveGenerationMacro, {
        board: ['wNd4'],
        turn: 'b',
        square: 'd4',
        expected: '',
    });

test('black knight has no moves on white\'s turn',
    moveGenerationMacro, {
        board: ['bNd4'],
        turn: 'w',
        square: 'd4',
        expected: '',
    });

test('knight is blocked by friendly pieces',
    moveGenerationMacro, {
        board: ['wc6', 'we6', 'wNd4', 'wb3', 'we2'],
        square: 'd4',
        expected: 'Nd4-b5 Nd4-c2 Nd4-f3 Nd4-f5',
    });

test('knight capturing moves',
    moveGenerationMacro, {
        board: ['bb3', 'bc6', 'be2', 'bf3', 'bf5', 'wNd4'],
        square: 'd4',
        expected: 'Nd4-b5 Nd4-c2 Nd4-e6 Nd4xb3 Nd4xc6 Nd4xe2 Nd4xf3 Nd4xf5',
    });
