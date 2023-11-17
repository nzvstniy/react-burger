import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { IIngredientKey } from '../ingredients/ingredients-types';

type TIngredientSliceState = {
  bun: null | IIngredientKey;
  ingredients: IIngredientKey[];
}



const initialState: TIngredientSliceState = { bun: null, ingredients: [] };

const ingredientsSelectSlice = createSlice({
  name: 'ingredientsSelect',
  initialState,
  reducers: {
    ADD_INGREDIENT: (state, { payload }) => {
      const { key, ingredient } = payload;
      const data = { ...ingredient, key, };

      if (ingredient.type === 'bun') {
        state.bun = data;
      } else {
        state.ingredients.push(data);
      }
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
export const { ADD_INGREDIENT, CHANGE_POSITION, REMOVE_INGREDIENT, RESET, } = ingredientsSelectSlice.actions;

export default ingredientsSelectSlice.reducer;