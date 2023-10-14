import { memo } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

import { useDrag } from 'react-dnd/dist/hooks';
import DND_TYPES from '../../../utils/dnd-types';

import { ingredientConstructorValue } from '../../../utils/ingredients-value';

function BurgerIngredient({ingredient, ingredientCounter, modalOpen,}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DND_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const countValue = ingredientCounter.get(ingredient._id);


  return (
    <div
    ref={dragPreview}
      role="button"
      tabIndex={0}
      onClick={(evt) => {
        //addIngredient(ingredient);
        modalOpen(evt, ingredient);
      }}
      onKeyDown={(evt) => modalOpen(evt, ingredient)}
    >
       <article
        className={`${styles.card} ${isDragging && styles.cardDragging}`}
        ref={drag}
      >
        {(countValue && <Counter count={countValue} size="default" />) ||
          null}
        <img
          className={styles.image}
          src={ingredient?.image}
          alt={`Ингредиент: ${ingredient?.name}`}
        />
        <div className={styles.price}>
          <span>{ingredient?.price}</span>
          <CurrencyIcon />
        </div>
        <h3 className={styles.heading}>{ingredient?.name}</h3>
      </article>
    </div>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientConstructorValue.isRequired,
  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
  modalOpen: PropTypes.func.isRequired,
};
export default memo(BurgerIngredient);

