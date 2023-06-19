const host = "https://webdev-hw-api.vercel.app/api/v2/kris-osipova557/comments";

import { token } from "./render-comments.js";


const fetchGet = () => {
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

const fetchPost = (name, text) => {
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

export { fetchGet, fetchPost, token };
