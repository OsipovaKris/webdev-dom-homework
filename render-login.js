import { loginUser, registerUser } from "./api.js";

export function renderLogin({ commentsHtml, appEl, setToken, fetchAndRenderComments }) {

    let isLoginMode = true;

    let isViewMode = true;

    const renderForm = () => {

        const appHtml = `${isViewMode ?
            `<div class="container">
                <ul class="comments">
                 ${commentsHtml}
                 </ul >
            <p>Чтобы добавить комментарий, <a href="#" style="color:white" class="toggle-login">авторизируйтесь</a></p>
            </div>`
            :
            `<div class="container">
                <p class="hidden">Пожалуйста подождите...</p>
                <div class="add-form login-form">
                    <h2 class="login-text">Форма ${isLoginMode ? "входа" : "регистрации"}</h2>
                    ${isLoginMode ? ""
                : `<input type="text" class="add-login" id="name-input" placeholder="Введите имя" />
                        <br>`}
                    <input type="text" class="add-login" id="login-input" placeholder="Введите логин" />
                    <br>
                    <input type="password" class="add-login" id="password-input" placeholder="Введите пароль" />
                    <div class="login-form-row">
                        <button class="add-form-button login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
                        <a href="#" class="toggle-button">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>
                    </div>
                </div>
            </div>`
            }`;

        appEl.innerHTML = appHtml;

        if (isViewMode) {

            document.querySelector('.toggle-login').addEventListener('click', function () {

                isViewMode = !isViewMode;

                renderForm();
            });
        }

        else {

            document.querySelector('.toggle-button').addEventListener('click', function () {

                isLoginMode = !isLoginMode;

                renderForm();
            });


            document.querySelector('.login-button').addEventListener('click', function () {

                if (isLoginMode) {

                    const login = document.getElementById('login-input').value;
                    const password = document.getElementById('password-input').value;

                    if (!login) {

                        alert('Введите логин');
                        return;
                    }

                    if (!password) {

                        alert('Введите пароль');
                        return;
                    }

                    loginUser({
                        login: login,
                        password: password,
                    })
                        .then((user) => {

                            setToken(`Bearer ${user.user.token}`);

                            fetchAndRenderComments();
                        })
                        .catch((error) => {

                            textPending.classList.add('hidden');

                            if (error.message === "Неверный логин или пароль") {
                                alert("Неверный логин или пароль, исправь и попробуй снова");
                                return;
                            }
                        })
                } else {

                    const login = document.getElementById('login-input').value;
                    const name = document.getElementById('name-input').value;
                    const password = document.getElementById('password-input').value;

                    registerUser({
                        login: login,
                        name: name,
                        password: password,
                    })
                        .then((user) => {

                            setToken(`Bearer ${user.user.token}`);

                            fetchAndRenderComments();
                        })
                        .catch((error) => {

                            textPending.classList.add('hidden');

                            if (error.message === "Пользователь с таким логином уже сущетсвует") {
                                alert("Пользователь с таким логином уже сущетсвует");
                                return;
                            }
                        })
                }


                const textPending = document.querySelector('p');
                textPending.classList.remove('hidden');
                textPending.textContent = 'Пожалуйста подождите, загружаю комментарии...';
            });
        };
    };

    renderForm();
}