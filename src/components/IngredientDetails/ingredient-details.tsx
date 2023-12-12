import styles from './ingredient-details.module.css';
import getCurrentIngredient from '../../services/reducer-selector-directory/currentIngredient/current-ingredient-selector';
import Preload from '../Preload/preload';
import { useParams } from 'react-router-dom';
import { FC, ReactElement, useEffect } from 'react';
import { useGetIngredientsQuery } from '../../services/reducer-selector-directory/ingredients/ingredients-reducer';
import { SHOW_INGREDIENT_DETAILS } from '../../services/reducer-selector-directory/currentIngredient/current-ingredient-slice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';


interface IIngredientDetailsProps {
  isPageSingle?: boolean;
}

interface INutritionalValue {
  value?: number;
  name: string;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ isPageSingle = false, }): ReactElement => {

  const { data } = useGetIngredientsQuery();
  const dispatch = useAppDispatch();
  const { id: _id } = useParams();

  const currentIngredient = useAppSelector(getCurrentIngredient);

  useEffect(() => {
    const res = data?.data.find((ingredient) => ingredient._id === _id);
    if (res) {
      dispatch(SHOW_INGREDIENT_DETAILS(res));
    }
  }, [data]
  );

  const nutritionalValue: INutritionalValue[] = [
    {
      value: currentIngredient?.calories,
      name: 'Калории, ккал',
    },
    {
      value: currentIngredient?.proteins,
      name: 'Белки, г',
    },
    {
      value: currentIngredient?.fat,
      name: 'Жиры, г',
    },
    {
      value: currentIngredient?.carbohydrates,
      name: 'Углеводы, г',
    },
  ]

  return currentIngredient ? (

    <div className={styles.wrapper}>
      {(isPageSingle && (
        <h1 className="text text_type_main-large">Детали ингредиента</h1>
      )) || <h3 className="text text_type_main-large">Детали ингредиента</h3>}

      <div className={styles.item}>
        <img src={currentIngredient.image_large} className="pr-5 pl-5" alt={currentIngredient?.name} />

        {(isPageSingle && (
          <h1 className={` text text_type_main-medium mt-4 mb-8`}>{currentIngredient?.name}</h1>
        )) || <h3 className={` text text_type_main-medium mt-4 mb-8`}>{currentIngredient?.name}</h3>}

        <ul className={`${styles.value} list-default`}>
          {nutritionalValue.map(({ value, name }) => (
            <li key={`key-${name}`} className={styles.value_item}>
              {(isPageSingle && (
                <h2 className="text text_type_main-default text_color_inactive">{name}</h2>
              )) || <h4 className="text text_type_main-default text_color_inactive">{name}</h4>}
              <p className="text text_type_digits-default text_color_inactive">{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : <Preload />
}


export default IngredientDetails;
