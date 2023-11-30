import { API } from "./api";
import { request } from "./request";



export const passwordForgot = async (email: { email: string }) =>
request(API.endpoints.user.password.forgot, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(email),
});

export const passwordReset  = async (data: {
    password: string;
    token: string;
  }) =>
    request(API.endpoints.user.password.reset, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  

