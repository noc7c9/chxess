import test from 'ava'
import {moveGenerationTest} from './_helpers'
import {Chxess} from '../build/chxess'


test('pawn move from middle of an empty board', t => {
    const chx = new Chxess()

    // white
    chx.clearBoard()
    chx.setSquare('d4', 'w')
    moveGenerationTest(t, chx, 'd4', 'd5')

    // black
    chx.clearBoard()
    chx.setSquare('d4', 'b')
    moveGenerationTest(t, chx, 'd4', 'd3')
})


test('pawn move from starting rank of an empty board', t => {
    const chx = new Chxess()

    // white
    chx.clearBoard()
    chx.setSquare('d2', 'w')
    moveGenerationTest(t, chx, 'd2', 'd3 d4')

    // white
    chx.clearBoard()
    chx.setSquare('d7', 'b')
    moveGenerationTest(t, chx, 'd7', 'd5 d6')
})
