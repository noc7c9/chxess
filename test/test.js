import test from 'ava'
import {Chxess} from '../build/chxess'

test('foo', t => {
    const chx = new Chxess()
    t.is(chx.foo(), 'foo');
})

test('bar', t => {
    const chx = new Chxess()
    t.is(chx.bar(), 'bar');
})
