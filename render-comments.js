// export const commentsBox = document.querySelector('.comments');
// export const formName = document.querySelector('.add-form-name');
// export const formText = document.querySelector('.add-form-text');
// const formButton = document.querySelector('.add-form-button');
// const formBox = document.querySelector('.add-form');
// const textPending = document.querySelector('p');


import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";



const initClickLikeButtons = () => {
    const commentLikeButtons = document.querySelectorAll('.like-button');
    const commentLikes = document.querySelectorAll('.likes-counter');

    for (let i = 0; i < commentLikeButtons.length; i++) {
        commentLikeButtons[i].addEventListener('click', function (event) {

            event.stopPropagation();

            if (!comments[i].isLiked) {
                comments[i].isLiked = true;
                comments[i].likes++;
            }

            else {
                comments[i].isLiked = false;
                comments[i].likes--;
            }

            renderComments();
        });
    };
};


const initAnswerComment = () => {

    const commentItems = document.querySelectorAll('.comment');

    for (let i = 0; i < commentItems.length; i++) {
        commentItems[i].addEventListener('click', function () {
            formText.value = `>${comments[i].commentary}\n${comments[i].name}, `;
        });
    }
};


const renderComments = () => {

    const appEl = document.getElementById("app");

    const commentsHtml = comments
        .map((comment) => {
            return `<li class="comment">
          <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
          </div>
          <div class="comment-body">
          <div class="comment-text">${comment.commentary}</div>
          </div>
          <div class="comment-footer">
          <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
          </div>
        </li >`;
        })
        .join("");

    const appHtml = `
        <div class="container">
            <ul class="comments">
                ${commentsHtml}
            </ul >
            <p class="hidden">Пожалуйста подождите, загружаю комментарии...</p>
            <div class="add-form">
                <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
                <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
        </div >`;

    appEl.innerHTML = appHtml;


    const formButton = document.querySelector('.add-form-button');
    const formBox = document.querySelector('.add-form');


    formButton.addEventListener('click', function () {

        if (formName.value !== "" && formText.value !== "") {
            console.log('object');

            textPending.classList.remove('hidden');
            textPending.textContent = 'Комментарий добавляется...';
            formBox.classList.add('hidden');


            fetchPost()
                .then(() => {

                    return fetchAndRenderComments();
                })
                .then(() => {

                    formBox.classList.remove('hidden');
                    textPending.classList.add('hidden');
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


    initClickLikeButtons();
    initAnswerComment();
};



const fetchAndRenderComments = () => {

    return fetchGet()
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


fetchAndRenderComments();

renderComments();


const textPending = document.querySelector('p');
textPending.classList.remove('hidden');


export const formName = document.querySelector('.add-form-name');
export const formText = document.querySelector('.add-form-text');