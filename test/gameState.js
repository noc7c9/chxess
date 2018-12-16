import test from 'ava';
import {createBoard} from './_helpers';
import {Chxess} from '../build/chxess';

test('turn starts on white', t => {
    const chx = new Chxess();

    t.is('w', chx.getTurn());
});

test('setting the turn works', t => {
    const chx = new Chxess();

    chx.setTurn('b');
    t.is('b', chx.getTurn());

    chx.setTurn('w');
    t.is('w', chx.getTurn());
});

test('toggling the turn works', t => {
    const chx = new Chxess();

    t.is('w', chx.getTurn());
    chx.toggleTurn();
    t.is('b', chx.getTurn());
    chx.toggleTurn();
    t.is('w', chx.getTurn());
});

test('white in check detection', t => {
    const chx = createBoard(['bc6', 'wKd5'], 'w');

    t.true(chx.isInCheck());
});

test('black in check detection', t => {
    const chx = createBoard(['bKe5', 'wNf3'], 'b');

    t.true(chx.isInCheck());
});

test('white in checkmate', t => {
    const chx = createBoard(['bKc1', 'bQa3', 'wKa1']);

    t.true(chx.isInCheckmate());

    t.true(chx.isGameOver());
});

test('white in stalemate', t => {
    const chx = createBoard(['bKc1', 'bRe2', 'wKa1']);

    t.true(chx.isInStalemate());

    t.false(chx.isInCheckmate());
    t.true(chx.isGameOver());
});
