import test from 'ava'
import {moveGenerationTest} from './_helpers'
import {Chxess} from '../build/chxess'

test('bishop moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()
    chx.setSquare('d4', 'wB')
    moveGenerationTest(t, chx, 'd4',
        'Ba1 Ba7 Bb2 Bb6 Bc3 Bc5 Be3 Be5 Bf2 Bf6 Bg1 Bg7 Bh8')
})


test('bishop moves from the corners of an empty board', t => {
    const chx = new Chxess()

    // bottom left corner
    chx.clearBoard()
    chx.setSquare('a1', 'wB')
    moveGenerationTest(t, chx, 'a1', 'Bb2 Bc3 Bd4 Be5 Bf6 Bg7 Bh8')

    // bottom right corner
    chx.clearBoard()
    chx.setSquare('h1', 'wB')
    moveGenerationTest(t, chx, 'h1', 'Ba8 Bb7 Bc6 Bd5 Be4 Bf3 Bg2')

    // top left corner
    chx.clearBoard()
    chx.setSquare('a8', 'wB')
    moveGenerationTest(t, chx, 'a8', 'Bb7 Bc6 Bd5 Be4 Bf3 Bg2 Bh1')

    // top right corner
    chx.clearBoard()
    chx.setSquare('h8', 'wB')
    moveGenerationTest(t, chx, 'h8', 'Ba1 Bb2 Bc3 Bd4 Be5 Bf6 Bg7')
})
