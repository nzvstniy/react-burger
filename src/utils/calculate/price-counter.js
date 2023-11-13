const priceCounter = (type, ingredients) => {
    let price = 0;

    if (ingredients) {
        if (type === 'bun') {
            price += ingredients.price * 2;
        }
    }
    if (type === 'ingredients') {
        price += ingredients.reduce((accum, current) => accum + current.price, 0);

    }
    return price;
};

export default priceCounter;