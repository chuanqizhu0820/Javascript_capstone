const loadComments = require('../__mocks__/loadComments');

test('should have 3 comments', () => {
  const commentsArr = [{
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
  expect(loadComments(commentsArr)).toBe(3);
});