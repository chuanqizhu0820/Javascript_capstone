const commentsCounter = require('../__mocks__/commentsCounter');

test('should have 3 comments', () => {
  const commentArr = [{
    item_id: '92995',
    username: 'chuanqi',
    comment: 'good',
  }, {
    item_id: '92995',
    username: 'chuanqi',
    comment: 'good',
  }, {
    item_id: '92995',
    username: 'chuanqi',
    comment: 'good',
  }];
  expect(commentsCounter(commentArr)).toBe(`Comments (3) by previous visitors`);
});

test('should have 0 comments', () => {
  const commentArr = null;
  expect(commentsCounter(commentArr)).toBe(`Comments (0) by previous visitors`);
});