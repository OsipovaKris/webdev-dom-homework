import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";
import { renderLogin } from "./render-login.js";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

const initClickLikeButtons = () => {
    const commentLikeButtons = document.querySelectorAll('.like-button');

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

            renderApp();
        });
    };
};


const initAnswerComment = () => {

    const commentItems = document.querySelectorAll('.comment');
    const formText = document.querySelector('.add-form-text');

    for (let i = 0; i < commentItems.length; i++) {
        commentItems[i].addEventListener('click', function () {
            formText.value = `>${comments[i].commentary}\n${comments[i].name}, `;
        });
    }
};


const renderApp = () => {

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


    if (!token) {

        renderLogin({
            commentsHtml,
            appEl,
            setToken: (newToken) => { token = newToken; },
            fetchAndRenderComments,
        });
        return;
    }


    const appHtml = `
         <div class="container">
             <ul class="comments">
                 ${commentsHtml}
             </ul >
             <p class="hidden">Пожалуйста подождите, загружаю комментарии...</p>
             <div class="add-form">
                 <input type="text" class="add-form-name" value="" disabled="true"/>
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

        const formName = document.querySelector('.add-form-name');
        const formText = document.querySelector('.add-form-text');
        const textPending = document.querySelector('p');

        if (formText.value !== "") {

            textPending.classList.remove('hidden');
            textPending.textContent = 'Комментарий добавляется...';
            formBox.classList.add('hidden');


            fetchPost(formName, formText)
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

            renderApp();
        })
        .then((data) => {

            textPending.classList.add('hidden');
        });
};


export let comments = [];

fetchAndRenderComments();
renderApp();

const textPending = document.querySelector('p');
textPending.classList.remove('hidden');

export { token };