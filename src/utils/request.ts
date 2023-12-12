import { API } from "./api";
export const checkResponse = (res: Response) => {
    if (!res.ok) {
        Promise.reject(Error(`Ошибка: ${res.status}`));
    }
    return res.json();
};

export const request = async (
    endpoint: string,
    options: {
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        headers?: HeadersInit;
        body?: BodyInit | null;
    },
    baseUrl: string = API.baseUrl) => {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    return checkResponse(res);
}