import { createSlice, } from '@reduxjs/toolkit';
import { login, register, logout, editUser, checkUserAuth } from './user-thunk';
import { IUser, IUserErrorResponse } from './user-types';

type TUserSliceState = {
    user: IUser | null;
    isAuthChecked: boolean;
    process: {
        isLoading: boolean;
        error: null | IUserErrorResponse;
    };
}

export const initialState: TUserSliceState = {
    user: null,
    isAuthChecked: false,
    process: {
        isLoading: false,
        error: null,
    },
};



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.process.isLoading = true;
                state.process.error = null;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.isLoading = false;
                state.process.error = null;
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.process.isLoading = false;
                state.process.error = payload as IUserErrorResponse;
            })
            .addCase(login.pending, (state) => {
                state.process.isLoading = true;
                state.process.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.isLoading = false;
                state.process.error = null;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.process.isLoading = false;
                state.process.error = payload as IUserErrorResponse;
            })
            .addCase(logout.pending, (state) => {
                state.process.isLoading = true;
                state.process.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.process.isLoading = false;
                state.process.error = null;
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.process.isLoading = false;
                state.process.error = payload as IUserErrorResponse;
            })
            .addCase(checkUserAuth.pending, (state) => {
                state.process.isLoading = true;
                state.process.error = null;
            })
            .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
                state.user = payload?.user;
                state.process.isLoading = false;
                state.process.error = null;
                state.isAuthChecked = true;
            })
            .addCase(checkUserAuth.rejected, (state, { payload }) => {
                state.process.isLoading = false;
                state.process.error = payload as IUserErrorResponse;
                state.isAuthChecked = true;
            })
            .addCase(editUser.pending, (state) => {
                state.process.isLoading = true;
                state.process.error = null;
            })
            .addCase(editUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.isLoading = false;
                state.process.error = null;
            })
            .addCase(editUser.rejected, (state, { payload }) => {
                state.process.isLoading = false;
                state.process.error = payload as IUserErrorResponse;
            })
            .addDefaultCase((state) => state);
    },

});


export default userSlice.reducer;