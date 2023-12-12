import { RootState } from "../../store";

const getCurrentIngredient = (state: RootState) => state.currentIngredient.ingredient;

export default getCurrentIngredient;