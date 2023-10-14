import { createAction, createReducer } from '@reduxjs/toolkit';

export const SHOW_INGREDIENT_DETAILS = createAction(
  'currentIngredient/show_ingredient_details'
);
export const RESET_INGREDIENT_DETAILS = createAction(
  'currentIngredient/reset_ingredient_details'
);

const initialState = {
  ingredient: {
    _id: '',
    name: '',
    image_large: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: '',
  },
};

const ingredientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      SHOW_INGREDIENT_DETAILS,
      (
        state,
        {
          payload: { _id, name, image_large, calories, proteins, fat, carbohydrates },
        }
      ) => {
        state.ingredient = {
          _id,
          name,
          image_large,
          calories,
          proteins,
          fat,
          carbohydrates,
        };
      }
    )

    .addCase(RESET_INGREDIENT_DETAILS, () => initialState)

    .addDefaultCase((state) => state);
});

export default ingredientReducer;