import { createSlice, } from '@reduxjs/toolkit';
import { login, register, logout, editUser, checkUserAuth } from './thunk';


const initialState = {
    user: null,
    isAuthChecked: false,

    process: {
        loading: false,
        error: null,
    },
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })

            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.loading = false;
                state.process.error = null;
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.process.loading = false;
                state.process.error = payload;
            })
            .addCase(login.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })

            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.loading = false;
                state.process.error = null;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.process.loading = false;
                state.process.error = payload;
            })
            .addCase(logout.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.process.loading = false;
                state.process.error = null;
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.process.loading = false;
                state.process.error = payload;
            })
            .addCase(checkUserAuth.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })
            .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
                state.user = payload?.user;
                state.process.loading = false;
                state.process.error = null;
                state.isAuthChecked = true;
            })
            .addCase(checkUserAuth.rejected, (state, { payload }) => {
                state.process.loading = false;
                state.process.error = payload;
                state.isAuthChecked = true;
            })
            .addCase(editUser.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })
            .addCase(editUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.process.loading = false;
                state.process.error = null;
            })
            .addCase(editUser.rejected, (state, { payload }) => {
                state.process.loading = false;
                state.process.error = payload;
            })
            .addDefaultCase((state) => state);
    },

});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;