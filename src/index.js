import './style.css';
import './comment.css';

const baseUri = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appId = 'K5LEyqREMBDZLL96ZFuw';

const addLike = async (itemId) => {
  const response = await fetch(`${baseUri}${appId}/likes`, {
    method: 'POST',
    body: JSON.stringify(
      {
        item_id: itemId,
      },
    ),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  response.json().then(() => {
  });
};

const getLike = (id, node) => {
  fetch(`${baseUri}${appId}/likes`)
    .then((response) => response.json())
    .then((json) => {
      let bool = false;
      let likenum = -1;
      json.forEach((item) => {
        if (item.item_id === id) {
          bool = true;
          likenum = item.likes;
        }
      });

      if (bool) {
        node.textContent = `like ${likenum + 1}`;
        addLike(id);
      } else if (bool === false) {
        node.textContent = 'like 1';
        addLike(id);
      }
    });
};

const loadLike = (id, node) => {
  fetch(`${baseUri}${appId}/likes`)
    .then((response) => response.json())
    .then((json) => {
      let bool = false;
      let likenum = 0;
      json.forEach((item) => {
        if (item.item_id === id) {
          bool = true;
          likenum = item.likes;
        }
      });
      if (bool) {
        node.textContent = `like ${likenum}`;
      } else if (bool === false) {
        node.textContent = 'like 0';
      }
    });
};

const commentsCounter = async (itemId) => {
  const response = await fetch(`${baseUri}${appId}/comments?item_id=${itemId}`);
  response.json().then((json) => {
    const itemArr = json;
    const commentsHeader = document.querySelector('#comments-header');
    if (json) {
      commentsHeader.textContent = `Comments (${itemArr.length}) By previous Visitors`;
    } else {
      commentsHeader.textContent = `Comments (0) By previous Visitors`;
    }

  });
}

const loadComments = (itemId) => {
  fetch(`${baseUri}${appId}/comments?item_id=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        const itemArr = json;
        const commentsDiv = document.querySelector('#comments');
        let commentsHtml = '';
        itemArr.forEach((item) => {
          commentsHtml += `<p>${item.creation_date} by ${item.username} : ${item.comment}`;
        });
        commentsDiv.innerHTML = commentsHtml;
        commentsCounter(itemId);
      }
      else {
        return 0
      }
    });
};

const uploadComment = (obj) => {
  fetch(`${baseUri}${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(() => {

    });
};

const loadPopupCommentPage = (itemId, popupNode) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      const meal = json.meals[0];
      const popupHtml = `
            <div class="container">
            <i class="fas fa-times fa-2x" id="go-back"></i>
                <div id="img-comment" class="img-comment">
                <img src="${meal.strMealThumb}" alt="meal-img">
                <h5>${meal.strMeal}</h5>
                </div>
                <div id="info-item-comment" class="item-info">
                <a href=${meal.strSource} target="_blank">See more about this meal <i class="fas fa-arrow-right"></i></a>
                </div>
                <h4 id="comments-header">Comments By previous Visitors</h4>
                <div id="comments" class="comments"></div>
                <div id="form-comment" class="form-comment">
                <form id="comment-form">
                <div class="form-group mb-3">
                <input type="text" class="form-control" id="your-name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group mb-3">
                <textarea class="form-control" id="your-comments" name="comment" placeholder="Your comment" required></textarea>
                </div>
                <button type="submit" class="btn btn-outline-secondary submit-btn">Comment</button>
                </form>

                </div>
                </div>
                `;
      popupNode.innerHTML = popupHtml;
      loadComments(meal.idMeal);

      const commentForm = document.querySelector('#comment-form');
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentObj = {
          item_id: meal.idMeal,
          username: commentForm.name.value,
          comment: commentForm.comment.value,
        };
        uploadComment(commentObj);
        commentForm.name.value = '';
        commentForm.comment.value = '';
        setTimeout(() => { loadComments(meal.idMeal); }, 1000);
      });

      const header = document.querySelector('header');
      const main = document.querySelector('.row');
      const footer = document.querySelector('footer');
      const popupComment = document.querySelector('#popup-comment');

      const goBack = document.querySelector('#go-back');
      goBack.addEventListener('click', () => {
        popupNode.innerHTML = '';
        header.style.filter = 'none';
        main.style.filter = 'none';
        footer.style.filter = 'none';
        popupComment.style.display = 'none';
      });
    });
};

const getFoodCounter = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese');
  response.json().then((json) => {
    const itemsCount = json.meals;
    const dishNum = document.querySelector('#dish-num');
    dishNum.textContent = `Dishes (${itemsCount.length})`;
  });
};

const getFood = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese');
  response.json().then((json) => {
    const itemArr = json.meals;
    let itemHtml = '';
    itemArr.forEach((item) => {
      itemHtml
        += `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-5">
                <div class="row">
                <div class="col-12 item-img">
                <img src=${item.strMealThumb} class="meal-img" alt="item image" id="${item.idMeal}img">
                </div>
                <div class="col-12 text-center">
                <p class="dishes-name">${item.strMeal}</p>
                </div>
                <div class="col-12 d-flex flex-row justify-content-between">
                <div class="item-like">
                <img id="${item.idMeal}" class="fa-heart" src="https://www.pngmagic.com/product_images/red-heart-png.png" />
                
                <span>likes</span>
                </div>
                <div>
                <button type="button" class="btn btn-outline-secondary btn-sm comment-btn">Comment</button>
                </div>
                </div>
                </div>
                </div>`;
    });

    const itemContainer = document.querySelector('#items');
    itemContainer.innerHTML = itemHtml;

    const itemLike = document.querySelectorAll('.item-like > img');

    itemLike.forEach((item) => {
      const likeNode = item.parentNode.querySelector('span');
      loadLike(item.id, likeNode);
      item.addEventListener('click', () => {
        const likeNode = item.parentNode.querySelector('span');
        getLike(item.id, likeNode);
      });
    });

    const header = document.querySelector('header');
    const main = document.querySelector('.row');
    const footer = document.querySelector('footer');
    const popupComment = document.querySelector('#popup-comment');
    const commentBtn = document.querySelectorAll('.comment-btn');

    commentBtn.forEach((item) => {
      item.addEventListener('click', () => {
        header.style.filter = 'blur(4px)';
        main.style.filter = 'blur(4px)';
        footer.style.filter = 'blur(4px)';
        popupComment.style.display = 'block';

        const itemId = item.parentNode.parentNode.querySelector('img').id;

        loadPopupCommentPage(itemId, popupComment);
      });
    });
  });
};

getFood();
getFoodCounter();