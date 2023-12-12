import { configureStore } from "@reduxjs/toolkit";

import reducer, { initialState } from './user-slice';

import { register, login, logout, editUser } from "./user-thunk";

import { API } from "../../../utils/api";

const EMAIL_MOCK = 'loremipsum@gmail.com';
const PASSWORD_MOCK = 'lorem';
const NAME_MOCK = 'Lorem';
const ACCESS_TOKEN_MOCK = '322322';
const REFRESH_TOKEN_MOCK = '322322';

const userMock = {
    email: EMAIL_MOCK,
    name: NAME_MOCK
}

describe('check user authorization', () => {
    let store;
  
    const mockSuccessResponse = {
      success: true,
      user: userMock,
      accessToken: ACCESS_TOKEN_MOCK,
      refreshToken: REFRESH_TOKEN_MOCK,
    };
  
    beforeEach(() => {
      store = configureStore({
        reducer,
        preloadedState: initialState,
      });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('should registration be successful', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });
  
      await store.dispatch(
        register({ ...userMock, password: PASSWORD_MOCK })
      );
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${API.baseUrl}${API.endpoints.user.register}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userMock, password: PASSWORD_MOCK }),
        }
      );
  
      expect(store.getState()).toEqual({
        ...initialState,
        user: userMock,
      });
    });
  
    it('should registration be fail', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Something went wrong',
        }),
      });
  
      await store.dispatch(
        register({ ...userMock, password: PASSWORD_MOCK })
      );
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${API.baseUrl}${API.endpoints.user.register}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userMock, password: PASSWORD_MOCK }),
        }
      );
  
      expect(store.getState()).toEqual({
        ...initialState,
        process: {
          ...initialState.process,
          error: `Ошибка регистрации: ${{
            success: false,
            message: 'Something went wrong',
          }}`,
        },
      });
    });
  
    it('should login be successful', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });
  
      await store.dispatch(
        login({ email: EMAIL_MOCK, password: PASSWORD_MOCK })
      );
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${API.baseUrl}${API.endpoints.user.login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: EMAIL_MOCK, password: PASSWORD_MOCK }),
        }
      );
  
      expect(store.getState()).toEqual({
        ...initialState,
        user: userMock,
      });
    });
  
    it('should login be fail', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Something went wrong',
        }),
      });
  
      await store.dispatch(
        login({ email: EMAIL_MOCK, password: PASSWORD_MOCK })
      );
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${API.baseUrl}${API.endpoints.user.login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: EMAIL_MOCK, password: PASSWORD_MOCK }),
        }
      );
  
      expect(store.getState()).toEqual({
        ...initialState,
        process: {
          ...initialState.process,
          error: `User login error: ${{
            success: false,
            message: 'Something went wrong',
          }}`,
        },
      });
    });
  });
  
  describe('check user manipulating with data', () => {
    let store;
  
    beforeEach(() => {
      store = configureStore({
        reducer,
        preloadedState: {
          ...initialState,
          user: { email: EMAIL_MOCK, name: NAME_MOCK },
        },
      });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('should logout be successful', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          message: 'Successful logout',
        }),
      });
  
      await store.dispatch(logout());
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(store.getState()).toEqual({
        ...initialState,
        user: null,
      });
    });
  
    it("should editing user's personal data be successful", async () => {
      const editedUserData = { email: 'ipsumdolem@gmail.com', name: 'Dolem' };
  
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          success: true,
          user: editedUserData,
        }),
      });
  
      await store.dispatch(editUser(editedUserData));
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(store.getState()).toEqual({
        ...initialState,
        user: editedUserData,
      });
    });
  
    it("should editing user's personal data be fail", async () => {
      const editedUserData = { email: 'jaspertest.com', name: 'Jasper' };
  
      jest.spyOn(global, 'fetch').mockRejectedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({
          success: false,
          message: 'Something went wrong',
        }),
      });
  
      await store.dispatch(editUser(editedUserData));
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(store.getState()).toEqual({
        ...initialState,
        user: { email: EMAIL_MOCK, name: NAME_MOCK },
        process: {
          ...initialState.process,
          error: `Ошибка изменения: ${{
            success: false,
            message: 'Something went wrong',
          }}`,
        },
      });
    });
  });