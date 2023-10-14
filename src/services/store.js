import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './reducer-selector-directory/ingredients/ingredients-reducer';
import ingredientReducer from './reducer-selector-directory/currentIngredient/current-ingredient-reducer';
import orderDetailsSlice from './reducer-selector-directory/orderDetails/order-details-reducer';
import ingredientsSelectReducer from './reducer-selector-directory/ingredientsSelect/select-ingredient-reducer';


const store = configureStore({
  reducer: {
    [ingredientsReducer.reducerPath]: ingredientsReducer.reducer,
    currentIngredient: ingredientReducer,
    ingredientsSelect: ingredientsSelectReducer,
    orderDetails: orderDetailsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsReducer.middleware),

});

export default store;
