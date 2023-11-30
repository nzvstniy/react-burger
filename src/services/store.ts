import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './reducer-selector-directory/currentIngredient/current-ingredient-slice';
import orderDetailsSlice from './reducer-selector-directory/orderDetails/order-details-slice';
import userSlice from './reducer-selector-directory/user/user-slice'
import authMiddleware from './reducer-selector-directory/middleware/auth-middleware';
import ingredientsSelectSlice from './reducer-selector-directory/ingredientsSelect/select-ingredient-slice';
import { ingredientsReducer } from './reducer-selector-directory/ingredients/ingredients-reducer';
import { orderFeedReducer } from './reducer-selector-directory/orderFeed/order-feed-reducer';
import { profileOrderFeedReducer } from './reducer-selector-directory/profileOrderFeed/profile-order-feed-reducer';
import { orderFeedMiddleware, profileOrderFeedMiddleware } from './reducer-selector-directory/middleware/ws-middleware';

const store = configureStore({
  reducer: {
    user: userSlice,
    [ingredientsReducer.reducerPath]: ingredientsReducer.reducer,
    currentIngredient: ingredientReducer,
    ingredientsSelect: ingredientsSelectSlice,
    orderDetails: orderDetailsSlice,
    orderFeed: orderFeedReducer,
    profileOrderFeed: profileOrderFeedReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware, ingredientsReducer.middleware, orderFeedMiddleware, profileOrderFeedMiddleware),

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
