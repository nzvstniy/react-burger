import BurgerConstructor from "../Burger/BurgerConstructor/burger-constructor";
import styles from './order-constructor.module.css'
import ingredientsValue from "../../utils/ingredients-value";
import ConstructorComposition from "../ConstructorComposition/constructor-composition";
import IngredientContext from '../../contexts/ingredientsContext';
import { useReducer, useState } from 'react';

const startTotalPrice = { state: 0 };

function reducer({ state }, {type, ingredientType, price}){
  switch (type) {
    case 'increment':
      return ingredientType === 'bun' ? { state: state + price * 2 } : { state: state + price };
    case 'decrement':
      return ingredientType === 'bun' ? { state: state - price * 2 } : { state: state - price };
    case 'reset':
      return startTotalPrice;
    default:
      throw new Error('Some error');

    }
}



function OrderConstructor({data}){
  const [totalPrice, totalPriceDispatcher] = useReducer( reducer, startTotalPrice);

  const [ingredientSelect, setIngredientSelect] = useState([]);
  const [bunSelect, setBunSelect] = useState({});

    return(
        <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Соберите бургер</h1>
          <div className={styles.shop}>
            <ConstructorComposition 
            data={data}
            ingredientSelect = {ingredientSelect}
            bunSelect = {bunSelect}
            setIngredientSelect = {setIngredientSelect}
            setBunSelect = {setBunSelect}
            totalPriceDispatcher = {totalPriceDispatcher}
            />
            <IngredientContext.Provider value={data}>
              <BurgerConstructor
              ingredientSelect = {ingredientSelect}
              bunSelect = {bunSelect}
              totalPrice = {totalPrice}
              />
            </IngredientContext.Provider>
          </div>
        </div>
      </main>
    );
}


OrderConstructor.propTypes = ingredientsValue;

export default OrderConstructor;





