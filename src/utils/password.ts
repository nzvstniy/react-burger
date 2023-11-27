import { API } from "./api";


type TResponse<T> = {
    success: boolean;
} & T;

const checkResponse = <T>(res: Response) =>
    res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}`));

export const passwordForgot = async (email: { email: string }) => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.password.forgot}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
    }
    );
    return checkResponse(res);

}

export const passwordReset = async (data: {
    password: string;
    token: string;
}) => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.password.reset}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    );
    return checkResponse(res);

}

