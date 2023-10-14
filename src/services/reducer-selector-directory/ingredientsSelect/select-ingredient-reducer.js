import { createAction, createReducer } from '@reduxjs/toolkit';

export const ADD_INGREDIENT = createAction(
  'ingredientsSelect/addIngredient'
);
export const REMOVE_INGREDIENT = createAction(
  'ingredientsSelect/removeIngredient'
);
export const CHANGE_POSITION = createAction(
  'ingredientsSelect/changePosition'
);

export const RESET = createAction('ingredientsSelect/reset');

const initialState = { bun: null, ingredients: [] };

const ingredientsSelectReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_INGREDIENT, (state, { payload }) => {
      const { key, ingredient } = payload;
      const data = {
        ...ingredient,
        key,
      };

      if (ingredient.type === 'bun') {
        state.bun = data;
      } else {
        state.ingredients.push(data);
      }
    })

    .addCase(
      CHANGE_POSITION,
      (state, { payload: { dragIndex, hoverIndex } }) => {
        const { ingredients } = state;

        [ingredients[dragIndex], ingredients[hoverIndex]] = [
          ingredients[hoverIndex],
          ingredients[dragIndex],
        ];
      }
    )

    .addCase(REMOVE_INGREDIENT, (state, { payload }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== payload.key
      );
    })

    .addCase(RESET, () => initialState)

    .addDefaultCase((state) => state);
});

export default ingredientsSelectReducer;