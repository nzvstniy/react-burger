import { createSlice } from '@reduxjs/toolkit';
import { IIngredient, IIngredientId } from '../ingredients/ingredients-types';

export const initialState: { ingredient: null | IIngredientId } = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    SHOW_INGREDIENT_DETAILS: (state, { payload }: { payload: IIngredientId }) => {
      state.ingredient = payload
    },

    RESET_INGREDIENT_DETAILS: () => initialState,
  },
});

export const { SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;