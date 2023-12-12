import { Middleware, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

const authMiddleware : Middleware<unknown, unknown, ThunkDispatch<unknown, unknown, AnyAction>> = () => (next) => (action) => {

    if (['user/register/fulfilled', 'user/login/fulfilled'].includes(action.type)) {
        const { accessToken, refreshToken, }: { accessToken: string; refreshToken: string } = action.payload;
        
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken.split(' ')[1]);
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    if (action.type === 'user/logout/fulfilled') {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')

    }

    return next(action);
}

export default authMiddleware;