import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './reducer-selector-directory/currentIngredient/current-ingredient-slice';
import orderDetailsSlice from './reducer-selector-directory/orderDetails/order-details-slice';
import userSlice from './reducer-selector-directory/user/user-slice'
import authMiddleware from './reducer-selector-directory/user/user-middleware';
import ingredientsSelectSlice from './reducer-selector-directory/ingredientsSelect/select-ingredient-slice';
import { ingredientsReducer } from './reducer-selector-directory/ingredients/ingredients-reducer';

const store = configureStore({
  reducer: {
    user: userSlice,
    [ingredientsReducer.reducerPath]: ingredientsReducer.reducer,
    currentIngredient: ingredientReducer,
    ingredientsSelect: ingredientsSelectSlice,
    orderDetails: orderDetailsSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authMiddleware, ingredientsReducer.middleware]),

});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
