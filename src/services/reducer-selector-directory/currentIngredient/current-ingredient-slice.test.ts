import { firstIngredientMock } from "../../../assets/mock/mock-ingredients";

import reducer, { initialState, SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } from "./current-ingredient-slice";

describe("check ingredient's data in modal window", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, RESET_INGREDIENT_DETAILS())).toEqual(
      initialState
    );
  });

  it('should set an ingredient', () => {
    expect(
      reducer(initialState, SHOW_INGREDIENT_DETAILS(firstIngredientMock))
    ).toEqual({ ingredient: firstIngredientMock });
  });

  it('should clear data', () => {
    const state = { ingredient: firstIngredientMock };

    expect(reducer(state, RESET_INGREDIENT_DETAILS())).toEqual(initialState);
  });
});