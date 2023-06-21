import { loginUser, registerUser } from "./api.js";

export function renderLogin({ appEl, setToken, fetchAndRenderComments }) {

    let isLoginMode = true;

    const renderForm = () => {

        const appHtml = `
        <div class="container">
            <p class="hidden">Пожалуйста подождите...</p>
            <div class="add-form login-form">
                <h2 class="login-text">Форма ${isLoginMode ? "входа" : "регистрации"}</h2>
                ${isLoginMode ? "" : `<input type="text" class="add-login" id="name-input" placeholder="Введите имя" />
                <br>`}
                <input type="text" class="add-login" id="login-input" placeholder="Введите логин" />
                <br>
                <input type="password" class="add-login" id="password-input" placeholder="Введите пароль" />
                <div class="login-form-row">
                    <button class="add-form-button login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
                    <a href="#" class="toggle-button">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>
                </div>
            </div>
        </div>
        `;

        appEl.innerHTML = appHtml;


        document.querySelector('.login-button').addEventListener('click', function () {

            if (isLoginMode) {

                const login = document.getElementById('login-input').value;
                const password = document.getElementById('password-input').value;

                loginUser({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);

                    fetchAndRenderComments();
                })
            } else {

                const login = document.getElementById('login-input').value;
                const name = document.getElementById('name-input').value;
                const password = document.getElementById('password-input').value;

                registerUser({
                    login: login,
                    name: name,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);

                    fetchAndRenderComments();
                })
            }


            const textPending = document.querySelector('p');
            textPending.classList.remove('hidden');
            textPending.textContent = 'Пожалуйста подождите, загружаю комментарии...';
        });

        document.querySelector('.toggle-button').addEventListener('click', function () {

            isLoginMode = !isLoginMode;

            renderForm();
        });
    };

    renderForm();
}