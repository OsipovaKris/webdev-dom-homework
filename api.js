const host = "https://webdev-hw-api.vercel.app/api/v2/kris-osipova/comments";

import { token } from "./render-comments.js";


export const fetchGet = () => {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {

            return response.json();
        })
};

export const fetchPost = (name, text) => {
    return fetch(host, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            name: name.value
                .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: text.value
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
};

export const loginUser = ({ login, password }) => {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    })
        .then((response) => {

            if (response.status === 400) {
                throw new Error("Неверный логин или пароль");
            }

            else {
                return response.json();
            }
        })
};

export const registerUser = ({ login, name, password }) => {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        })
    })
        .then((response) => {

            if (response.status === 400) {
                throw new Error("Пользователь с таким логином уже сущетсвует");
            }

            else {
                return response.json();
            }
        })
};