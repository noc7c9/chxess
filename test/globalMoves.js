import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('moves from empty square',
    moveGenerationMacro, {
        board: [],
        square: 'a1',
        expected: '',
})
