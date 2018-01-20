import test from 'ava'
import {Chxess} from '../build/chxess'

test('turn starts on white', t => {
    const chx = new Chxess()

    t.is('w', chx.getTurn())
})

test('setting the turn works', t => {
    const chx = new Chxess()

    chx.setTurn('b')
    t.is('b', chx.getTurn())

    chx.setTurn('w')
    t.is('w', chx.getTurn())
})
