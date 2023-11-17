import { StoreState } from "../../store";

export const getBunSelect = (state: StoreState) => state.ingredientsSelect.bun;

export const getIngredientsSelect = (state: StoreState) => state.ingredientsSelect.ingredients;