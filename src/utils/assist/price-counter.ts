import { IIngredientKey } from "../../services/reducer-selector-directory/ingredients/ingredients-types";

const priceCounter = (type: 'bun' | 'ingredients', ingredient: IIngredientKey | IIngredientKey[] | null): number => {
    let price = 0;

    if (type === 'bun' && ingredient) {
        price += (ingredient as IIngredientKey).price * 2;
    }

    if (type === 'ingredients' && Array.isArray(ingredient) && ingredient.length) {
        price += ingredient.reduce((accum, current) => accum + current.price, 0);
    }

    return price;
};

export default priceCounter;