import { API } from "./api";
const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(new Error(`Error ${res.status}`));

export const passwordForgot = async (email) => {
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



export const passwordReset = async (data) => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.password.reset}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),
    }
    );
    return checkResponse(res);

}

