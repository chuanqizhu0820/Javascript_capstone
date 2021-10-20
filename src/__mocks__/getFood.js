const getFood = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese");
    response.json().then((json) => {
        let itemArr = json.meals;
        const dishNum = document.querySelector("#dish-num");
        console.log(itemArr.length);
        return itemArr.length;
    })
};

module.exports = getFood;