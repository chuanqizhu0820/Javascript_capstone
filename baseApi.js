
const baseUrl = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getDishes = async (mealId) => {
  const url = `${baseUrl}${mealId}`;
  let dishes = await fetch(url);
  dishes = await dishes.json();
  return dishes;
};

export default getDishes;