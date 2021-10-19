import './style.css';

const getFood = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese");
    response.json().then((json) => {
        let itemArr = json.meals;
        console.log(itemArr[0]);
        let itemHtml = '';
        itemArr.forEach(item => {
            itemHtml +=
                `
                <div id="${item.idMeal}" class="col-4">
                <div class="row">
                <div class="col-12 item-img">
                <img src=${item.strMealThumb} alt="item image">
                </div>
                <div class="col-12 text-center">
                <p>${item.strMeal}</p>
                </div>
                <div class="col-6">
                <img src="https://img.icons8.com/material-outlined/24/000000/like--v2.png" />
                <span>likes</span>
                </div>
                <div class="col-6 text-left">
                <button type="button">Comment</button>
                </div>
                </div>
                </div>`;
        });

        const itemConstainer = document.querySelector("#items");
        itemConstainer.innerHTML = itemHtml;
    });
};

getFood();



