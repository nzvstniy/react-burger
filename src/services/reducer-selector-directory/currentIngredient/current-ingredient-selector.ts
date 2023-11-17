import { StoreState } from "../../store";

const getCurrentIngredient = (state: StoreState) => state.currentIngredient.ingredient;

export default getCurrentIngredient;