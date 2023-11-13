import { useMemo, memo } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { getBunSelect, getIngredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { useDrag } from 'react-dnd/dist/hooks';
import DND_TYPES from '../../../utils/dnd-types';
import ingredientsCounter from '../../../utils/calculate/ingredients-counter';
import { ingredientConstructorValue } from '../../../utils/ingredients-value';
import { useLocation, Link } from 'react-router-dom';

function BurgerIngredient({ ingredient, }) {

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DND_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [])


  const location = useLocation();

  const bunSelect = useSelector(getBunSelect);
  const ingredientsSelect = useSelector(getIngredientsSelect);
  const counter = useMemo(() => ingredientsCounter(ingredient, bunSelect, ingredientsSelect),
    [bunSelect, ingredientsSelect]
  );


  return (
    <Link to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}>
      <div ref={dragPreview} role="button" tabIndex={0}>
        <article
          className={`${styles.card} ${isDragging && styles.cardDragging}`}
          ref={drag}
        >
          {(counter && <Counter count={counter} size="default" />) || null}
          <img
            className={styles.image}
            src={ingredient?.image}
            alt={`Ингредиент: ${ingredient?.name}`}
          />
          <div className={`${styles.price} text text_type_main-default`}>
            <span>{ingredient?.price}</span>
            <CurrencyIcon />
          </div>
          <h3 className="text text_type_main-default">{ingredient?.name}</h3>
        </article>
      </div>
    </Link>


  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientConstructorValue.isRequired,
};
export default memo(BurgerIngredient);

