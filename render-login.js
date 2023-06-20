import { login } from "./api.js";

export function renderLogin({ appEl, setToken, fetchAndRenderComments }) {

    let isLogin = true;

    const renderForm = () => {

        const appHtml = `
        <div class="container">
            <p class="hidden">Пожалуйста подождите...</p>
            <div class="add-form login-form">
                <h2 class="login-text">Форма ${isLogin ? "входа" : "регистрации"}</h2>
                ${isLogin ? "" : `<input type="text" class="add-login" placeholder="Введите имя" />
                <br>`}
                <input type="text" class="add-login" placeholder="Введите логин" />
                <br>
                <input type="password" class="add-login" placeholder="Введите пароль" />
                <div class="login-form-row">
                    <button class="add-form-button login-button">${isLogin ? "Войти" : "Зарегистрироваться"}</button>
                    <a href="#" class="toggle-button">${isLogin ? "Зарегистрироваться" : "Войти"}</a>
                </div>
            </div>
        </div>
        `;

        appEl.innerHTML = appHtml;


        document.querySelector('.login-button').addEventListener('click', function () {

            setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

            login({
                login: "glebka",
                password: "123456",
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);

                fetchAndRenderComments();
            })


            const textPending = document.querySelector('p');
            textPending.classList.remove('hidden');
            textPending.textContent = 'Пожалуйста подождите, загружаю комментарии...';
        });

        document.querySelector('.toggle-button').addEventListener('click', function () {

            isLogin = !isLogin;

            renderForm();
        });
    };

    renderForm();
}