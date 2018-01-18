import test from 'ava'
import {Chxess} from '../build/chxess'

test('rook moves from middle of an empty board', t => {
    const chx = new Chxess()
    chx.clearBoard()

    chx.setSquare('d4', 'wR')

    const expected = [
        'Ra4', 'Rb4', 'Rc4', 'Re4', 'Rf4', 'Rg4', 'Rh4',
        'Rd1', 'Rd2', 'Rd3', 'Rd5', 'Rd6', 'Rd7', 'Rd8',
    ].sort()
    const actual = chx.getMoves('d4').sort()

    t.deepEqual(actual, expected)
})


test('rook moves from the corners of an empty board', t => {
    const chx = new Chxess()

    // bottom left corner
    {
        chx.clearBoard()

        chx.setSquare('a1', 'wR')

        const expected = [
            'Rb1', 'Rc1', 'Rd1', 'Re1', 'Rf1', 'Rg1', 'Rh1',
            'Ra2', 'Ra3', 'Ra4', 'Ra5', 'Ra6', 'Ra7', 'Ra8',
        ].sort()
        const actual = chx.getMoves('a1').sort()

        t.deepEqual(actual, expected)
    }


    // bottom right corner
    {
        chx.clearBoard()

        chx.setSquare('h1', 'wR')

        const expected = [
            'Ra1', 'Rb1', 'Rc1', 'Rd1', 'Re1', 'Rf1', 'Rg1',
            'Rh2', 'Rh3', 'Rh4', 'Rh5', 'Rh6', 'Rh7', 'Rh8',
        ].sort()
        const actual = chx.getMoves('h1').sort()

        t.deepEqual(actual, expected)
    }


    // top left corner
    {
        chx.clearBoard()

        chx.setSquare('a8', 'wR')

        const expected = [
            'Rb8', 'Rc8', 'Rd8', 'Re8', 'Rf8', 'Rg8', 'Rh8',
            'Ra1', 'Ra2', 'Ra3', 'Ra4', 'Ra5', 'Ra6', 'Ra7',
        ].sort()
        const actual = chx.getMoves('a8').sort()

        t.deepEqual(actual, expected)
    }


    // top right corner
    {
        chx.clearBoard()

        chx.setSquare('h8', 'wR')

        const expected = [
            'Ra8', 'Rb8', 'Rc8', 'Rd8', 'Re8', 'Rf8', 'Rg8',
            'Rh1', 'Rh2', 'Rh3', 'Rh4', 'Rh5', 'Rh6', 'Rh7',
        ].sort()
        const actual = chx.getMoves('h8').sort()

        t.deepEqual(actual, expected)
    }
})
