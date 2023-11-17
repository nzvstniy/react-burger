import { useMemo, memo, FC, ReactElement } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { getBunSelect, getIngredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { useDrag } from 'react-dnd/dist/hooks';
import DndTypes from '../../../utils/dnd-types';
import ingredientsCounter from '../../../utils/calculate/ingredients-counter';
import { useLocation, Link } from 'react-router-dom';
import { IIngredient } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';
import { useStoreSelector } from '../../../services/hooks';

interface IBurgerIngredient {
  ingredient: IIngredient;
}

const BurgerIngredient: FC<IBurgerIngredient> = ({
  ingredient,
}): ReactElement => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DndTypes.Ingredient,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [])


  const location = useLocation();

  const bunSelect = useStoreSelector(getBunSelect);
  const ingredientsSelect = useStoreSelector(getIngredientsSelect);

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
            <CurrencyIcon type="primary"/>
          </div>
          <h3 className="text text_type_main-default">{ingredient?.name}</h3>
        </article>
      </div>
    </Link>


  );
}

export default memo(BurgerIngredient);

