import { StoreState } from "../../store";

export const isLoading = (state: StoreState) => state.user.process.isLoading;
export const getEmail = (state: StoreState) => state.user.user?.email;
export const getName = (state: StoreState) => state.user.user?.name;
export const checkUser = (state: StoreState) => state.user.user;
export const checkAuthStatus = (state: StoreState) => state.user.isAuthChecked;