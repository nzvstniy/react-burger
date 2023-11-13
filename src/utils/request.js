import { API } from "./api";
export const checkResponse = (res) => {
    if (!res.ok) {
        console.log(res)
        throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
};

export const request = async (endpoint, options, baseUrl = API.baseUrl) => {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    return checkResponse(res);
}

