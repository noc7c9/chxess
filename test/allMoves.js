import test from 'ava'
import {moveGenerationMacro} from './_helpers'

test('simple multi piece layout',
    moveGenerationMacro, {
        board: ['ba1', 'bb4', 'bc7', 'be1', 'be3', 'be8', 'bf5', 'bh4', 'wBc3',
            'wBd7', 'wBf3', 'wNb6', 'wNc1', 'wNh3', 'wQb8', 'wRd5', 'wRh1'],
        expected: `
            Qa7 Qa8 Qb7 Qc8 Qd8 Qxc7 Qxe8
            Ba4 Bb2 Bb5 Bc6 Bc8 Bd1 Bd2 Bd4 Be2 Be4 Be5 Be6 Bf6 Bg2 Bg4 Bg7 Bh5 Bh8
            Bxa1 Bxb4 Bxe1 Bxe8 Bxf5
            Ra5 Rb5 Rc5 Rd1 Rd2 Rd3 Rd4 Rd6 Re5 Rf1 Rg1 Rh2
            Rxe1 Rxf5
            Na2 Na4 Na8 Nb3 Nc4 Nc8 Nd3 Ne2 Nf2 Nf4 Ng1 Ng5
        `,
})
