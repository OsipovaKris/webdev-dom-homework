import { formName } from "./main.js";
import { formText } from "./main.js";

const fetchGet = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/kris-osipova2/comments", {
        method: "GET",
    })
        .then((response) => {

            return response.json();
        })
};

const fetchPost = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/kris-osipova2/comments", {
        method: "POST",
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
