import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../utils/api";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { request } from "../../../utils/request";

const checkAccessToken = (token) => {
    const MS = 1;
    const expiration = jwtDecode(token).exp;
    return dayjs.unix(expiration).diff(dayjs()) < MS;

}

const refreshingToken = async () => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.refreshToken}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        })
    if (!res.ok) {
        return Promise.reject(new Error(`Ошибка ${res.status}`))
    }
    return res.json();
};

const requestWithRefresh = async (endpoint, options, baseUrl = API.baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}${endpoint}`, options);
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка ${res.status}`))
        }
        return await res.json();
    }
    catch (error) {
        if (error.message === 'token expired') {
            const { accessToken, refreshToken } = await refreshingToken();
            localStorage.setItem('accessToken', accessToken.split(' ')[1]);
            localStorage.setItem('refreshToken', refreshToken);
            options.headers.authorization = accessToken.split(' ')[1];
            const res = await fetch(`${baseUrl}${endpoint}`, options);
            if (!res.ok) {
                return Promise.reject(new Error(`Ошибка ${res.status}`))
            }
            return res.json();
        } else {
            return Promise.reject(error);
        }
    }
};
/*
const restoreAccessToken = async () => {
    try {
        const res = await fetch(`${API.baseUrl}${API.endpoints.user.refreshToken}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') })

            }
        )
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка ${res.status}`))
        }
        const { accessToken, refreshToken } = await res.json();
        localStorage.setItem('accessToken', accessToken.split(' ')[1]);
        localStorage.setItem('refreshToken', refreshToken);

        return localStorage.getItem('accessToken');
    }
    catch (error) {
        throw new Error(`Ошибка: ${error}`)
    }
}
*/

export const checkUserAuth = createAsyncThunk('user/auth', async (_, { rejectWithValue }) => {
    let token = localStorage.getItem('accessToken');
    if (!token)
        return null;
    if (checkAccessToken(token)) {
        token = await requestWithRefresh();
    }
    try {
        return await requestWithRefresh(API.endpoints.user.data, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (err) {
        return rejectWithValue(`User get data error: ${err}`);
    }
});


export const editUser = createAsyncThunk('user/editData', async (data, { rejectWithValue }) => {
    let token = localStorage.getItem('accessToken');
    if (token && checkAccessToken(token)) {
        token = await requestWithRefresh();
    }
    try {
        return await requestWithRefresh(API.endpoints.user.data, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }
    catch (err) {
        return rejectWithValue(`User edit error: ${err}`);
    }
});


export const register = createAsyncThunk('user/register', async (data, { rejectWithValue }) => {
    try {
        return await request(API.endpoints.user.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    catch (err) {
        return rejectWithValue(`User registration error: ${err}`);
    }
});


export const login = createAsyncThunk('user/login', async (data) => request(API.endpoints.user.login, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
}));


export const logout = createAsyncThunk('user/logout', async () => (await request(API.endpoints.user.logout, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
})));

