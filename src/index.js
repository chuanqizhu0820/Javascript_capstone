import './style.css';
import Logo from './dragon.jpeg';

const myLogo = new Image();
myLogo.src = Logo;
const logoDiv = document.querySelector('#logo-div');
logoDiv.appendChild(myLogo);

let appId = "K5LEyqREMBDZLL96ZFuw";

const addLike = async (item_id) => {

    const response = await fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/likes", {
        method: 'POST',
        body: JSON.stringify(
            {
                "item_id": item_id
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    response.json().then((json) => {
        console.log(json);
    });
}

const getLike = (id, node) => {
    console.log(node);
    fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/likes")
        .then(response => response.json())
        .then(json => {
            let bool = false
            let idx = 0;
            let likenum = -1;
            json.forEach((item, i) => {
                if (item.item_id === id) {
                    bool = true;
                    idx = i;
                    likenum = item.likes;
                }
            })
            if (bool) {
                node.textContent = `like ${likenum + 1}`;
                addLike(id);
            } else if (bool == false) {
                node.textContent = `like 1`;
                addLike(id);
            }
        });
}

const loadLike = (id, node) => {
    console.log(node);
    fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/likes")
        .then(response => response.json())
        .then(json => {
            let bool = false
            let idx = 0;
            let likenum = 0;
            json.forEach((item, i) => {
                if (item.item_id === id) {
                    bool = true;
                    idx = i;
                    likenum = item.likes;
                }
            })
            if (bool) {
                node.textContent = `like ${likenum}`;
            } else if (bool == false) {
                node.textContent = `like 0`;
            }
        });
}

const getFood = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese");
    response.json().then((json) => {
        let itemArr = json.meals;
        const dishNum = document.querySelector("#dish-num");
        dishNum.textContent = `Dishes (${itemArr.length})`
        let itemHtml = '';
        itemArr.forEach(item => {
            itemHtml +=
                `
                <div class="col-4">
                <div class="row">
                <div class="col-12 item-img">
                <img src=${item.strMealThumb} alt="item image">
                </div>
                <div class="col-12 text-center">
                <p>${item.strMeal}</p>
                </div>
                <div class="col-6 item-like">
                <img id="${item.idMeal}" src="https://img.icons8.com/material-outlined/24/000000/like--v2.png" />
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

        const itemLike = document.querySelectorAll(".item-like > img");
        itemLike.forEach((item) => {
            let likeNode = item.parentNode.querySelector("span");
            loadLike(item.id, likeNode);
            item.addEventListener("click", () => {
                let likeNode = item.parentNode.querySelector("span");
                getLike(item.id, likeNode);
            })
        })
    });
};

getFood();











