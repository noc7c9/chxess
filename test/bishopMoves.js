import test from 'ava'
import {Chxess} from '../build/chxess'

test('bishop moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()

    chx.setSquare('d4', 'wB')

    const expected = [
        'Ba1', 'Ba7', 'Bb2', 'Bb6', 'Bc3', 'Bc5', 'Be3', 'Be5', 'Bf2', 'Bf6',
        'Bg1', 'Bg7', 'Bh8'
    ].sort()
    const actual = chx.getMoves('d4').sort()

    t.deepEqual(actual, expected)
})


test('bishop moves from the corners of an empty board', t => {
    const chx = new Chxess()

    // bottom left corner
    {
        chx.clearBoard()

        chx.setSquare('a1', 'wB')

        const expected = [
            'Bb2', 'Bc3', 'Bd4', 'Be5', 'Bf6', 'Bg7', 'Bh8'
        ].sort()
        const actual = chx.getMoves('a1').sort()

        t.deepEqual(actual, expected)
    }


    // bottom right corner
    {
        chx.clearBoard()

        chx.setSquare('h1', 'wB')

        const expected = [
            'Ba8', 'Bb7', 'Bc6', 'Bd5', 'Be4', 'Bf3', 'Bg2'
        ].sort()
        const actual = chx.getMoves('h1').sort()

        t.deepEqual(actual, expected)
    }


    // top left corner
    {
        chx.clearBoard()

        chx.setSquare('a8', 'wB')

        const expected = [
            'Bb7', 'Bc6', 'Bd5', 'Be4', 'Bf3', 'Bg2', 'Bh1'
        ].sort()
        const actual = chx.getMoves('a8').sort()

        t.deepEqual(actual, expected)
    }


    // top right corner
    {
        chx.clearBoard()

        chx.setSquare('h8', 'wB')

        const expected = [
            'Ba1', 'Bb2', 'Bc3', 'Bd4', 'Be5', 'Bf6', 'Bg7'
        ].sort()
        const actual = chx.getMoves('h8').sort()

        t.deepEqual(actual, expected)
    }
})

