// import { formName } from "./render-comments.js";
// import { formText } from "./render-comments.js";

const host = "https://webdev-hw-api.vercel.app/api/v2/kris-osipova3/comments";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

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

export { fetchGet, fetchPost };
