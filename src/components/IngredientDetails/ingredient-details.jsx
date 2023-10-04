import styles from './ingredient-details.module.css';
import ingredientsValue from '../../utils/ingredients-value';

function IngredientDetails({
  currentIngredient: { image_large, name, calories, proteins, fat, carbohydrates },
}) {
  return (
    <div className={styles.wrapper}>
    <img src={image_large} className="pr-5 pl-5" alt={name} />
    <h3 className="text text_type_main-medium mt-4 mb-8">{name}</h3>
    <ul className={`${styles.value} list-default`}>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Калории, ккал</h4>
        <p className="text text_type_digits-default text_color_inactive">{calories}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{fat}</p>
      </li>
      <li className={styles.value__item}>
        <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
        <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
      </li>
    </ul>
  </div>
  );
}

IngredientDetails.propTypes = ingredientsValue;

export default IngredientDetails;
