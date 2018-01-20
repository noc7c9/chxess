import test from 'ava'
import {moveGenerationTest} from './_helpers'
import {Chxess} from '../build/chxess'

test('knight moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()
    chx.setSquare('d4', 'wN')
    moveGenerationTest(t, chx, 'd4', 'Nb3 Nb5 Nc2 Nc6 Ne2 Ne6 Nf3 Nf5');
})


test('knight moves from the corners of an empty board', t => {
    const chx = new Chxess()

    // bottom left corner
    chx.clearBoard()
    chx.setSquare('a1', 'wN')
    moveGenerationTest(t, chx, 'a1', 'Nb3 Nc2');

    // bottom right corner
    chx.clearBoard()
    chx.setSquare('h1', 'wN')
    moveGenerationTest(t, chx, 'h1', 'Nf2 Ng3');

    // top left corner
    chx.clearBoard()
    chx.setSquare('a8', 'wN')
    moveGenerationTest(t, chx, 'a8', 'Nb6 Nc7');

    // top right corner
    chx.clearBoard()
    chx.setSquare('h8', 'wN')
    moveGenerationTest(t, chx, 'h8', 'Nf7 Ng6');
})
