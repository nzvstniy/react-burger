import { RootState } from "../../store";

export const getBunSelect = (state: RootState) => state.ingredientsSelect.bun;

export const getIngredientsSelect = (state: RootState) => state.ingredientsSelect.ingredients;