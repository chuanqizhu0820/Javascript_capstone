const getFood = require('../__mocks__/getFood');

test('should return 3 dishes', () => {
  const foodArr = ['food1', 'food2', 'food3'];
  expect(getFood(foodArr)).toBe(3);
});

test('should return 6 dishes', () => {
  const foodArr = ['food1', 'food2', 'food3', 'food4', 'food6', 'food6'];
  expect(getFood(foodArr)).toBe(6);
});