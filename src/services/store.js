import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './reducer-selector-directory/ingredients/ingredients-reducer';
import ingredientReducer from './reducer-selector-directory/currentIngredient/current-ingredient-reducer';
import orderDetailsSlice from './reducer-selector-directory/orderDetails/order-details-reducer';
import ingredientsSelectReducer from './reducer-selector-directory/ingredientsSelect/select-ingredient-reducer';
import userSlice from './reducer-selector-directory/user/slice'
import authMiddleware from './reducer-selector-directory/user/middleware';

const store = configureStore({
  reducer: {
    user: userSlice,
    [ingredientsReducer.reducerPath]: ingredientsReducer.reducer,
    currentIngredient: ingredientReducer,
    ingredientsSelect: ingredientsSelectReducer,
    orderDetails: orderDetailsSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authMiddleware, ingredientsReducer.middleware]),

});

export default store;
