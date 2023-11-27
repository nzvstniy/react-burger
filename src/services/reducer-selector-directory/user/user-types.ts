export interface IUser {
    email: string;
    name: string;
}

export interface IUserRegistration extends IUser {
    password: string;
}

export interface IUserEdit extends IUser {
    password?: string;
}

export interface IAccessToken {
    id: string;
    exp: number;
    iat: number;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserAuthResponse {
    success: true;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface IUserEditResponse {
    success: true;
    user: IUser;
}

export interface IUserLogoutResponse {
    success: true;
    message: 'Успешно';
}

export interface IUserErrorResponse {
    success: false;
    message: string;
}