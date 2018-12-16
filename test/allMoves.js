import test from 'ava';
import {moveGenerationMacro} from './_helpers';

test('moves from empty square',
    moveGenerationMacro, {
        board: [],
        square: 'a1',
        expected: '',
    });

test('simple multi piece layout',
    moveGenerationMacro, {
        board: [
            'ba1', 'bb4', 'bc7', 'be1', 'be3', 'be8', 'bf5', 'bh4',

            'wd2',
            'wNb6', 'wNc1', 'wNh3',
            'wBc3', 'wBd7', 'wBf3',
            'wRd5', 'wRh1',
            'wQb8',
        ],
        expected: `
            d2-d3 d2-d4 d2xe3

            Nb6-a4 Nb6-a8 Nb6-c4 Nb6-c8
            Nc1-a2 Nc1-b3 Nc1-d3 Nc1-e2
            Nh3-f2 Nh3-f4 Nh3-g1 Nh3-g5

            Bc3-b2 Bc3-d4 Bc3-e5 Bc3-f6 Bc3-g7 Bc3-h8
            Bc3xa1 Bc3xb4
            Bd7-a4 Bd7-b5 Bd7-c6 Bd7-c8 Bd7-e6
            Bd7xe8 Bd7xf5
            Bf3-d1 Bf3-e2 Bf3-e4 Bf3-g2 Bf3-g4 Bf3-h5

            Rd5-a5 Rd5-b5 Rd5-c5 Rd5-d3 Rd5-d4 Rd5-d6 Rd5-e5 Rd5xf5
            Rh1-f1 Rh1-g1 Rh1-h2 Rh1xe1
            Qb8-a7 Qb8-a8 Qb8-b7 Qb8-c8 Qb8-d8 Qb8xc7 Qb8xe8
        `,
    });

test('can\'t move into check',
    moveGenerationMacro, {
        board: [
            'bBf3', 'bRb3', 'bd6', 'wKd4',
        ],
        expected: 'Kd4-c4',
    });

test('can\'t ignore check',
    moveGenerationMacro, {
        board: [
            'bRd8', 'bRe8', 'bRh4', 'bRh5', 'wKd4', 'wQc6', 'wQf3', 'wQf6',
        ],
        expected: 'Kd4-c3',
    });
