import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../utils/api";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { IAccessToken, IUserAuthResponse, IUserEdit, IUserEditResponse, IUserLogin, IUserLogoutResponse, IUserRegistration } from "./user-types";
import { checkResponse, request } from "../../../utils/request";
const checkAccessToken = (token: string): boolean => {
    const MS = 1;
    const expiration = jwtDecode<IAccessToken>(token).exp;
    return dayjs.unix(expiration).diff(dayjs()) < MS;

}
/*
const refreshingToken = async () => {
    const res = await fetch(`${API.baseUrl}${API.endpoints.user.refreshToken}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        })
    return checkResponse(res);
};
*/
export const refreshingToken = async () => {
    try {
      const res = await fetch(
        `${API.baseUrl}${API.endpoints.user.refreshToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        }
      );
  
      if (!res.ok) {
        Promise.reject(new Error(`Error ${res.status}`));
      }
  
      const { accessToken, refreshToken } = await res.json();
  
      localStorage.setItem('accessToken', accessToken.split(' ')[1]);
      localStorage.setItem('refreshToken', refreshToken);
  
      return localStorage.getItem('accessToken');
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

/*
по какой-то причине ловлю 403, не пойму чо не так, надо ковыряться
export const requestWithRefresh = async (endpoint: string, options: RequestInit, baseUrl = API.baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}${endpoint}`, options);
        return await checkResponse(res);
    }
    catch (error: any) {
        if (error.message === "jwt expired") {
            const { accessToken, refreshToken } = await refreshingToken();
            localStorage.setItem('accessToken', accessToken.split(' ')[1]);
            localStorage.setItem('refreshToken', refreshToken);
            options.headers = { ...options.headers, authorization: accessToken.split(' ')[1] }
            const res = await fetch(`${baseUrl}${endpoint}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(error);
        }
    }
};
*/
export const checkUserAuth = createAsyncThunk('user/auth', async (_, { rejectWithValue }) => {
    let token: string | null | undefined = localStorage.getItem('accessToken');
    if (!token) return null;
    if (checkAccessToken(token)) {
        token = await refreshingToken();
        /*
        token = await requestWithRefresh(API.endpoints.user.data, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        */
    }
    try {
        return await request(API.endpoints.user.data, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (err) {
        return rejectWithValue(`Ошибка получения данных: ${err}`);
    }
});


export const editUser = createAsyncThunk<IUserEditResponse, IUserEdit, { rejectValue: unknown }>('user/editData', async (data, { rejectWithValue }) => {
    let token: string | null | undefined = localStorage.getItem('accessToken');
    if (token && checkAccessToken(token)) {
        token = await refreshingToken();
        /*
        token = await requestWithRefresh(API.endpoints.user.data, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        */
    }
    try {
        return await request(API.endpoints.user.data, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }
    catch (err) {
        return rejectWithValue(`Ошибка изменения: ${err}`);
    }
});


export const register = createAsyncThunk<IUserAuthResponse, IUserRegistration, { rejectValue: unknown }>('user/register', async (data, { rejectWithValue }) => {
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
        return rejectWithValue(`Ошибка регистрация: ${err}`);
    }
});


export const login = createAsyncThunk<IUserAuthResponse,IUserLogin, { rejectValue: unknown }>('user/login', async (data) =>
    request(API.endpoints.user.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
);


export const logout = createAsyncThunk('user/logout', async () => (
    await request(API.endpoints.user.logout, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })) as IUserLogoutResponse
);

