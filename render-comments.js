import {comments} from "./main";

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

const commentsBox = document.querySelector('.comments');

const renderComments = () => {

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

    commentsBox.innerHTML = commentsHtml;

    initClickLikeButtons();
    initAnswerComment();
};

export default renderComments;