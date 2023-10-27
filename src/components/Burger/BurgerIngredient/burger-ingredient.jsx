import { memo } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';

function BurgerIngredient({ _id, name, type, link, price,  ingredientSelect, bunSelect, setIngredientSelect, setBunSelect, totalPriceDispatcher, modalOpen, }) {

  const addIngredient = (
    idSelect, nameSelect, typeSelect, imageSelect, priceSelect
  ) => {
    const newIngredient = {
      _id: idSelect, name: nameSelect, type: typeSelect, image: imageSelect, price: priceSelect
    };

    if (typeSelect === 'bun') {
      setBunSelect(newIngredient);
      if (Object.keys(bunSelect).length) {
        totalPriceDispatcher({
          type: 'decrement',
          ingredientType: typeSelect,
          price: bunSelect.price,
        });
      }
      totalPriceDispatcher({
        type: 'increment',
        ingredientType: typeSelect,
        price,
      })
      return undefined;
    }
    const selected = ingredientSelect.find(
      (ingredient) => ingredient._id === _id
    );
    if (selected) return undefined;

    setIngredientSelect((prevState) => [...prevState, newIngredient]);
    return totalPriceDispatcher({
      type: 'increment',
      ingredientType: typeSelect,
      price
    })
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(event) => {
        addIngredient(_id, name, type, link, price);
        modalOpen(event, _id);
      }}
      onKeyDown={(event) => modalOpen(event, _id)}
    >
      <article className={styles.card}>
        <img className={styles.image} src={link} alt={`Ингредиент: ${name}`} />
        <div className={styles.price}>
          <span>{price}</span>
          <CurrencyIcon />
        </div>
        <h3 className={styles.heading}>{name}</h3>
      </article>
    </div>
  );
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  setBunSelect: PropTypes.func.isRequired,
  setIngredientSelect: PropTypes.func.isRequired,
  totalPriceDispatcher: PropTypes.func.isRequired,
  modalOpen: PropTypes.func.isRequired,

};

export default memo(BurgerIngredient);
