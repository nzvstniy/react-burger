const ingredientsCounter = (ingredient, bunSelect, ingredientsSelect) => {

    let count = 0;

    if (ingredient.type === 'bun' && bunSelect) {
        count = (bunSelect._id === ingredient._id) * 2;
    }

    if (ingredient.type !== 'bun' && ingredientsSelect) {
        count = ingredientsSelect.filter((item) => item._id === ingredient._id).length;
    }

    return count;
};

export default ingredientsCounter;