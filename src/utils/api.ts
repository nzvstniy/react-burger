export const API = Object.freeze({
  baseUrl: 'https://norma.nomoreparties.space/api',
  endpoints: {
    user: {
      data: '/auth/user',
      register: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
      refreshToken: '/auth/token',
      password: {
        forgot: '/password-reset',
        reset: '/password-reset/reset',
      },
    },
    orders: '/orders',

    ingredients: '/ingredients',
  },

});

export const ROUTES = Object.freeze({

  home: '/',
  sign: {
    up: '/register',
    in: '/login',
  },

  password: {
    forgot: '/forgot-password',
    reset: '/reset-password',
  },
  user: {
    profile: '/profile',
    orders: 'orders',
  },
  orders: '/feed',
  ingredientDetails: '/ingredients/:id',

})

