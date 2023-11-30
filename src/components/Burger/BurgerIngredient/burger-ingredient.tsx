import { useMemo, memo, FC, ReactElement } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { getBunSelect, getIngredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { useDrag } from 'react-dnd/dist/hooks';
import DndTypes from '../../../utils/dnd-types';
import ingredientsCounter from '../../../utils/calculate/ingredients-counter';
import { useLocation, Link } from 'react-router-dom';
import { IIngredient, IIngredientId } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';
import { useAppSelector } from '../../../services/hooks';
import { ROUTES } from '../../../utils/api';
import Price from '../../Price/price';

interface IBurgerIngredient {
  ingredient: IIngredientId;
}

const BurgerIngredient = ({ ingredient }: IBurgerIngredient) => {

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DndTypes.Ingredient,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [])


  const location = useLocation();

  const bunSelect = useAppSelector(getBunSelect);
  const ingredientsSelect = useAppSelector(getIngredientsSelect);

  const counter = useMemo(() => ingredientsCounter(ingredient, bunSelect, ingredientsSelect),
    [bunSelect, ingredientsSelect]
  );


  return (
    <Link to={`${ROUTES.ingredients}/${ingredient._id}`}
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
          <Price type="total" totalPrice={ingredient.price} size="small" />
          <h3 className="text text_type_main-default">{ingredient?.name}</h3>
        </article>
      </div>
    </Link>


  );
}

export default memo(BurgerIngredient);

