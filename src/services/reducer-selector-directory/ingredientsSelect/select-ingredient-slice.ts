import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { IIngredientKey } from '../ingredients/ingredients-types';

type TIngredientSliceState = {
  bun: null | IIngredientKey;
  ingredients: IIngredientKey[];
}



export const initialState: TIngredientSliceState = {
  bun: null,
  ingredients: []
};

const ingredientsSelectSlice = createSlice({
  name: 'ingredientsSelect',
  initialState,
  reducers: {
    ADD_INGREDIENT: (state, action) => {
      const { key, ingredient } = action.payload;
      const data = { ...ingredient, key, };
      state.ingredients.push(data);
    },

    ADD_BUN: (state, action) => {
      const { key, ingredient } = action.payload;
      const data = { ...ingredient, key, };
      state.bun = data;
    },

    CHANGE_POSITION: (state, { payload: { dragIndex, hoverIndex } }) => {
      const { ingredients } = state;

      [ingredients[dragIndex], ingredients[hoverIndex]] = [
        ingredients[hoverIndex],
        ingredients[dragIndex],
      ];
    },

    REMOVE_INGREDIENT: (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== payload.key
      );
    },

    RESET: () => initialState,
  },
});
export const { ADD_INGREDIENT, CHANGE_POSITION, REMOVE_INGREDIENT, RESET, ADD_BUN } = ingredientsSelectSlice.actions;

export default ingredientsSelectSlice.reducer;