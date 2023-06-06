export const commentsBox = document.querySelector('.comments');
export const formName = document.querySelector('.add-form-name');
export const formText = document.querySelector('.add-form-text');
const formButton = document.querySelector('.add-form-button');
const formBox = document.querySelector('.add-form');
const textPending = document.querySelector('p');

textPending.classList.remove('hidden');

import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";

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

import renderComments from "./render-comments.js";

fetchAndRenderComments();
renderComments();

formButton.addEventListener('click', function () {

    if (formName.value !== "" && formText.value !== "") {

        formBox.classList.add('hidden');
        textPending.classList.remove('hidden');
        textPending.textContent = "Комментарий добавляется...";

        fetchPost()
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