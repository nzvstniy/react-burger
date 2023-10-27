export const loading = (state) => state.user.process.loading;
export const getEmail = (state) => state.user.user?.email;
export const getName = (state) => state.user.user?.name;
export const checkUser = (state) => state.user.user;
export const checkAuthStatus = (state) => state.user.isAuthChecked;