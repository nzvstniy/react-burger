import styles from './ingredient-details.module.css';
import ingredientsValue from '../../utils/ingredients-value';
import { useSelector } from 'react-redux';
import getCurrentIngredient from '../../services/reducer-selector-directory/currentIngredient/current-ingredient-selector';
import Preload from '../Preload/preload';


function IngredientDetails() {
  const currentIngredient = useSelector(getCurrentIngredient);


  return currentIngredient?(
    <div className={styles.wrapper}>
    <img src={currentIngredient.image_large} className="pr-5 pl-5" alt={currentIngredient.name} />
    <h3 className="text text_type_main-medium mt-4 mb-8">{currentIngredient.name}</h3>
    <ul className={`${styles.value} list-default`}>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Калории, ккал</h4>
        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
      </li>
    </ul>
  </div>
  ): <Preload/>
}


export default IngredientDetails;
