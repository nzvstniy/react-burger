import { RootState } from "../../store";

export const isLoading = (state: RootState) => state.user.process.isLoading;
export const getEmail = (state: RootState) => state.user.user?.email;
export const getName = (state: RootState) => state.user.user?.name;
export const checkUser = (state: RootState) => state.user.user;
export const checkAuthStatus = (state: RootState) => state.user.isAuthChecked;