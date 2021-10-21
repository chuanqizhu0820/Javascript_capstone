const involveBase = 'https://us-central1-involvement-api.cloudfunctions.netcapstoneApi/';
const appId = 'K5LEyqREMBDZLL96ZFuw';

const commentApis = async (mealId) => {
  const url = `${involveBase}/${appId}/comments?item_id=${mealId}`;
  let comments = await fetch(url);
  comments = await comments.json();
  return comments;
};

export default commentApis;