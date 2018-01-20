import test from 'ava'
import {Chxess} from '../build/chxess'

test('knight moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()

    chx.setSquare('d4', 'wN')

    const expected = [
        'Nb3', 'Nb5', 'Nc2', 'Nc6', 'Ne2', 'Ne6', 'Nf3', 'Nf5',
    ].sort()
    const actual = chx.getMoves('d4').sort()

    t.deepEqual(actual, expected)
})


test('knight moves from the corners of an empty board', t => {
    const chx = new Chxess()

    // bottom left corner
    {
        chx.clearBoard()

        chx.setSquare('a1', 'wN')

        const expected = [
            'Nb3', 'Nc2',
        ].sort()
        const actual = chx.getMoves('a1').sort()

        t.deepEqual(actual, expected)
    }


    // bottom right corner
    {
        chx.clearBoard()

        chx.setSquare('h1', 'wN')

        const expected = [
            'Nf2', 'Ng3',
        ].sort()
        const actual = chx.getMoves('h1').sort()

        t.deepEqual(actual, expected)
    }


    // top left corner
    {
        chx.clearBoard()

        chx.setSquare('a8', 'wN')

        const expected = [
            'Nb6', 'Nc7',
        ].sort()
        const actual = chx.getMoves('a8').sort()

        t.deepEqual(actual, expected)
    }


    // top right corner
    {
        chx.clearBoard()

        chx.setSquare('h8', 'wN')

        const expected = [
            'Nf7', 'Ng6',
        ].sort()
        const actual = chx.getMoves('h8').sort()

        t.deepEqual(actual, expected)
    }
})
