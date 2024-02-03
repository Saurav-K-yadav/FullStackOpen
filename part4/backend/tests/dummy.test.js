const dummy = require('../utils/list_helper').dummy

describe('Helper', () => {
    const blog=[]
    test('Check One', () => {
        expect(dummy(blog)).toBe(1)
    })
})