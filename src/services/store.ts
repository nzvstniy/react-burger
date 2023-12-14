import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import orderDetailsSlice from './reducer-selector-directory/orderDetails/order-details-slice';
import userSlice from './reducer-selector-directory/user/user-slice'
import authMiddleware from './reducer-selector-directory/middleware/auth-middleware';
import ingredientsSelectSlice from './reducer-selector-directory/ingredientsSelect/select-ingredient-slice';
import { ingredientsReducer } from './reducer-selector-directory/ingredients/ingredients-reducer';
import { orderFeedReducer } from './reducer-selector-directory/orderFeed/order-feed-reducer';
import { profileOrderFeedReducer } from './reducer-selector-directory/profileOrderFeed/profile-order-feed-reducer';
import { orderFeedMiddleware, profileOrderFeedMiddleware } from './reducer-selector-directory/middleware/ws-middleware';
import currentIngredientSlice from './reducer-selector-directory/currentIngredient/current-ingredient-slice';

const rootReducer = combineReducers({
  user: userSlice,
  [ingredientsReducer.reducerPath]: ingredientsReducer.reducer,
  currentIngredient: currentIngredientSlice,
  ingredientsSelect: ingredientsSelectSlice,
  orderDetails: orderDetailsSlice,
  orderFeed: orderFeedReducer,
  profileOrderFeed: profileOrderFeedReducer,
});

export const storeSetup = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authMiddleware,
        ingredientsReducer.middleware,
        orderFeedMiddleware,
        profileOrderFeedMiddleware
      ),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore['dispatch'];
