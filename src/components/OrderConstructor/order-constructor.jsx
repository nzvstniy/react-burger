import BurgerConstructor from "../Burger/BurgerConstructor/burger-constructor";
import styles from './order-constructor.module.css'
import ConstructorComposition from "../ConstructorComposition/constructor-composition";
import { useReducer, useState } from 'react';
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ingredientsValue } from "../../utils/ingredients-value";


const startTotalPrice = { state: 0 };

function reducer({ state }, { type, ingredientType, price }) {
  switch (type) {
    case 'increment':
      return ingredientType === 'bun' ? { state: state + price * 2 } : { state: state + price };
    case 'decrement':
      return ingredientType === 'bun' ? { state: state - price * 2 } : { state: state - price };
    case 'reset':
      return startTotalPrice;
    default:
      throw new Error('Error');

  }
}



function OrderConstructor() {
  const [ingredientCounter, setIngredientCounter] = useState(new Map());


  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <DndProvider backend={HTML5Backend}>
            <ConstructorComposition
              ingredientCounter={ingredientCounter}
            />

            <BurgerConstructor
              
              ingredientCounter={ingredientCounter}
              onCount={setIngredientCounter}
            />
          </DndProvider>
        </div>
      </div>
    </main>
  );
}


OrderConstructor.propTypes = ingredientsValue;

export default OrderConstructor;





