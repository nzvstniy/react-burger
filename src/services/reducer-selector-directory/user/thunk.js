import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../utils/api";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";


const checkAccessToken = (token) => {
    const MS = 1;
    const expiration = jwtDecode(token).exp;
    return dayjs.unix(expiration).diff(dayjs()) < MS;

}

export const register = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API.baseUrl}${API.endpoints.user.register}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                return Promise.reject(new Error(`Ошибка ${res.status}`));
            }

            return await res.json();
        } catch (error) {
            return rejectWithValue(`Ошибка при регистрации: ${error}`);
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const res = await fetch(`${API.baseUrl}${API.endpoints.user.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка ${res.status}`));
        }
        const success = await res.json();
        return success;
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const res = await fetch(`${API.baseUrl}${API.endpoints.user.logout}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        });

        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка ${res.status}`));
        }

        const success = await res.json();

        return success;
    });

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

export const checkUserAuth = createAsyncThunk(
    'user/auth',
    async (_, { rejectWithValue }) => {
        let token = localStorage.getItem('accessToken');
        if (checkAccessToken(token)) {
            token = await restoreAccessToken();
        }

        try {
            const res = await fetch(`${API.baseUrl}${API.endpoints.user.data}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (!res.ok) {
                return Promise.reject(new Error(`Ошибка ${res.status}`));
            }
            return await res.json();
        }
        catch (error) {
            return rejectWithValue(`Ошибка получения данных: ${error}`);
        }
    }
)

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data, { rejectWithValue }) => {
        let token = localStorage.getItem('accessToken');

        if (checkAccessToken(token)) {
            token = await restoreAccessToken();
        }
        try {
            const res = await fetch(`${API.baseUrl}${API.endpoints.user.data}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                return Promise.reject(new Error(`Ошибка ${res.status}`));
            }
            return await res.json();
        }
        catch (error) {
            return rejectWithValue(`Ошибка изменения данных: ${error}`)
        }
    }
)