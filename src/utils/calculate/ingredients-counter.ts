import { IIngredient } from "../../services/reducer-selector-directory/ingredients/ingredients-types";

const ingredientsCounter = (ingredient: IIngredient, bunSelect: IIngredient | null, ingredientsSelect: IIngredient[]) => {

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