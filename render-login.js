export function renderLogin({ appEl, setToken, fetchAndRenderComments }) {

    const appHtml = `
            <div class="container">
                <p class="hidden">Пожалуйста подождите...</p>
                <div class="add-form login-form">
                    <h2 class="login-text">Форма входа</h2>
                    <input type="text" class="add-login" placeholder="Введите логин" />
                    <br>
                    <input type="password" class="add-login" placeholder="Введите пароль" />
                    <div class="add-form-row">
                        <button class="add-form-button login-button" id="login-button"">Войти</button>
                    </div>
                </div>
            </div>`;

    appEl.innerHTML = appHtml;


    document.querySelector('.login-button').addEventListener('click', function () {

        setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

        fetchAndRenderComments();

        const textPending = document.querySelector('p');
        textPending.classList.remove('hidden');
        textPending.textContent = 'Пожалуйста подождите, загружаю комментарии...';
    });
}