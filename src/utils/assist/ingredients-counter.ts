import { IIngredientId } from "../../services/reducer-selector-directory/ingredients/ingredients-types";

const ingredientsCounter = (
    ingredient: IIngredientId,
    bunSelect: IIngredientId | null,
    ingredientsSelect: IIngredientId[]
) => {

    let count = 0;

    if (ingredient.type === 'bun' && bunSelect && bunSelect._id === ingredient._id) {
        count = 2;
    }
    if (ingredient.type !== 'bun' && ingredientsSelect) {
        count = ingredientsSelect.filter((item) => item._id === ingredient._id).length;
    }

    return count;
};

export default ingredientsCounter;