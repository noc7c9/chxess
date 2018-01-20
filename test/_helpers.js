export function moveGenerationTest(t, chx, square) {
    let expected = [...arguments].slice(moveGenerationTest.length);

    // convert from the form ['d f  a', 'c   e  b']
    //           to the form ['a', 'b', 'c', 'd', 'e', 'f']
    expected = expected
        .map((v) => v.split(' ') // split each sub array by spaces
        .filter((v) => v.length > 0)) // remove empty strings
        .reduce((a, v) => a.concat(v), []) // flatten the array
        .sort();

    const actual = chx.getMoves(square).sort()

    t.deepEqual(actual, expected);
}
