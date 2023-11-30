import { TIngredientsDetails } from "../../../services/reducer-selector-directory/ingredients/ingredients-types";
import OrderCards from "../../OrderCards/order-cards";
import styles from './order-ingredients.module.css';

interface IOrderIngredientsProps {
    data: TIngredientsDetails;
  }
  
  const OrderIngredients = ({ data }: IOrderIngredientsProps) => (
    <div className={`${styles.ingredients} my-scroll`}>
      {Object.keys(data).map((id) => {
        const { name, image, number, price } = data[id];
        
        return (
          <OrderCards
            key={id}
            typeInfo='details'
            ingredientName={name}
            ingredientImage={image}
            ingredientNum={number}
            ingredientPrice={price}
          />
        );
      })}
    </div>
  );
  
  export default OrderIngredients;