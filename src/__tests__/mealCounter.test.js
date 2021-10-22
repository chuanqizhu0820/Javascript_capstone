const getFoodCounter = require('../__mocks__/mealCounter');

test('should return 3 dishes', () => {
  const itemArr = ['food1', 'food2', 'food3'];
  expect(getFoodCounter(itemArr)).toBe('Dishes (3)');
});

test('should return 3 dishes', () => {
  const itemArr = ['food1', 'food2', 'food3', 'food4', 'food5', 'food6'];
  expect(getFoodCounter(itemArr)).toBe('Dishes (6)');
});