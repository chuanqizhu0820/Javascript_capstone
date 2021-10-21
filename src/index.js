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

const loadComments = (itemId) => {
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/comments?item_id=${itemId}`)
        .then(response => response.json())
        .then(json => {
            const commentsDiv = document.querySelector("#comments")
            let commentsHtml = ""
            json.forEach((item) => {
                commentsHtml += `<p>${item.creation_date} by ${item.username} : ${item.comment}`;
            })
            commentsDiv.innerHTML = commentsHtml;
        })
}

const uploadComment = (obj) => {
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/comments`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });
}

const loadPopupCommentPage = (itemId, popupNode) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
        .then(response => response.json())
        .then(json => {
            let meal = json.meals[0];
            let popupHtml = `
                <div id="img-comment">
                <img src="${meal.strMealThumb}" alt="meal-img">
                <h5>${meal.strMeal}</h5>
                </div>
                <div id="info-item-comment">
                <a href=${meal.strSource} target="_blank">See more about this meal</a>
                </div>
                <div id="comments"></div>
                <div id="form-comment">
                <form id="comment-form">
                <div class="form-group mb-3">
                <input type="text" class="form-control" id="your-name" name="name" placeholder="Your name">
                </div>
                <div class="form-group mb-3">
                <textarea class="form-control" id="your-comments" name="comment" placeholder="Your comment"></textarea>
                </div>
                <button type="submit" class="btn btn-outline-secondary">Comment</button>
                </form>
                <button type="submit" class="btn btn-outline-secondary btn-sm" id="go-back">Go back to menu</button>
                </div>
                `;
            popupNode.innerHTML = popupHtml;
            loadComments(meal.idMeal);

            const commentForm = document.querySelector("#comment-form");
            commentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                let commentObj = {
                    "item_id": meal.idMeal,
                    "username": commentForm.name.value,
                    "comment": commentForm.comment.value
                }
                uploadComment(commentObj);
                commentForm.name.value = "";
                commentForm.comment.value = "";
                setTimeout(() => { loadComments(meal.idMeal) }, 1000);
            })

            const header = document.querySelector("header");
            const main = document.querySelector("main");
            const footer = document.querySelector("footer");
            const popupComment = document.querySelector("#popup-comment");

            const goBack = document.querySelector("#go-back");
            goBack.addEventListener("click", () => {
                popupNode.innerHTML = "";
                header.style.display = "block";
                main.style.display = "block";
                footer.style.display = "block";
                popupComment.style.display = "none";
                const aToItem = document.createElement('a');
                aToItem.href = `#${itemId}img`;
                aToItem.click();
            })
        });
}

const getFood = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese");
    response.json().then((json) => {
        let itemArr = json.meals;
        console.log(json);
        const dishNum = document.querySelector("#dish-num");
        dishNum.textContent = `Dishes (${itemArr.length})`;
        let itemHtml = '';
        itemArr.forEach(item => {
            itemHtml +=
                `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-5">
                <div class="row">
                <div class="col-12 item-img">
                <img src=${item.strMealThumb} alt="item image" id="${item.idMeal}img">
                </div>
                <div class="col-12 text-center">
                <p>${item.strMeal}</p>
                </div>
                <div class="col-12 d-flex flex-row justify-content-between">
                <div class="item-like">
                <img id="${item.idMeal}" src="https://img.icons8.com/material-outlined/24/000000/like--v2.png" />
                <span>likes</span>
                </div>
                <div>
                <button type="button" class="btn btn-outline-secondary btn-sm comment-btn">Comment</button>
                </div>
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
        });

        const header = document.querySelector("header");
        const main = document.querySelector("main");
        const footer = document.querySelector("footer");
        const popupComment = document.querySelector("#popup-comment");
        const commentBtn = document.querySelectorAll(".comment-btn");

        commentBtn.forEach((item) => {
            item.addEventListener("click", () => {

                header.style.display = "none";
                main.style.display = "none";
                footer.style.display = "none";
                popupComment.style.display = "block";

                const itemId = item.parentNode.parentNode.querySelector("img").id;

                loadPopupCommentPage(itemId, popupComment);
            })
        })


    });
};

getFood();













