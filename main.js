// const commentsBox = document.querySelector('.comments');
const formName = document.querySelector('.add-form-name');
const formText = document.querySelector('.add-form-text');
const formButton = document.querySelector('.add-form-button');
const formBox = document.querySelector('.add-form');
const textPending = document.querySelector('p');

textPending.classList.remove('hidden');

const fetchAndRenderComments = () => {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/kris-osipova1/comments", {
    method: "GET",
  })
    .then((response) => {

      return response.json();
    })

    .then((responseData) => {

      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString().slice(0, -3),
          commentary: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      comments = appComments;
      renderComments();
    })
    .then((data) => {

      textPending.classList.add('hidden');
    });
};

export let comments = [];

// const initClickLikeButtons = () => {

//   const commentLikeButtons = document.querySelectorAll('.like-button');
//   const commentLikes = document.querySelectorAll('.likes-counter');

//   for (let i = 0; i < commentLikeButtons.length; i++) {
//     commentLikeButtons[i].addEventListener('click', function (event) {

//       event.stopPropagation();

//       if (!comments[i].isLiked) {
//         comments[i].isLiked = true;
//         comments[i].likes++;
//       }

//       else {
//         comments[i].isLiked = false;
//         comments[i].likes--;
//       }

//       renderComments();
//     });
//   };
// };

// const initAnswerComment = () => {

//   const commentItems = document.querySelectorAll('.comment');

//   for (let i = 0; i < commentItems.length; i++) {
//     commentItems[i].addEventListener('click', function () {
//       formText.value = `>${comments[i].commentary}\n${comments[i].name}, `;
//     });
//   }
// };

import renderComments from "./render-comments.js";

// const renderComments = () => {
//   const commentsHtml = comments
//     .map((comment) => {
//       return `<li class="comment">
//         <div class="comment-header">
//         <div>${comment.name}</div>
//         <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//         <div class="comment-text">${comment.commentary}</div>
//         </div>
//         <div class="comment-footer">
//         <div class="likes">
//         <span class="likes-counter">${comment.likes}</span>
//         <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
//         </div>
//         </div>
//       </li >`;
//     })
//     .join("");

//   commentsBox.innerHTML = commentsHtml;

//   initClickLikeButtons();
//   initAnswerComment();
// };

fetchAndRenderComments();
renderComments();

formButton.addEventListener('click', function () {

  if (formName.value !== "" && formText.value !== "") {

    formBox.classList.add('hidden');
    textPending.classList.remove('hidden');
    textPending.textContent = "Комментарий добавляется...";

    fetch("https://webdev-hw-api.vercel.app/api/v1/kris-osipova1/comments", {
      method: "POST",
      body: JSON.stringify({
        name: formName.value
          .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        text: formText.value
          .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        forceError: false,
      })
    })
      .then((response) => {

        if (response.status === 400) {
          throw new Error("Плохой запрос");
        }

        if (response.status === 500) {
          throw new Error("Сервер сломался");
        }

        else {
          return response.json();
        }
      })
      .then(() => {

        return fetchAndRenderComments();
      })
      .then(() => {

        formBox.classList.remove('hidden');
        formName.value = '';
        formText.value = '';
      })
      .catch((error) => {

        formBox.classList.remove('hidden');
        textPending.classList.add('hidden');

        if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны содержать больше 3 символов, исправь и попробуй снова");
          return;
        }

        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуй позже");
          return;
        }

        else {
          alert("Что-то пошло не так, попробуй позже");
          console.log(error);
          return;
        }
      });

    renderComments();
  }
});

console.log("It works!");