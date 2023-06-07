import { formName } from "./main.js";
import { formText } from "./main.js";

const host = "https://webdev-hw-api.vercel.app/api/v2/kris-osipova1/comments";

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

const fetchPost = () => {
    return fetch(host, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            name: formName.value
                .replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            text: formText.value
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
