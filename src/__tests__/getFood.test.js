
const getFood = require('../__mocks__/getFood');

test("should return 12 dishes", () => {
    expect(getFood()).toBe(12);
})