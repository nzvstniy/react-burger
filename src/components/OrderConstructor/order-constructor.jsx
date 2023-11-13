import BurgerConstructor from "../Burger/BurgerConstructor/burger-constructor";
import styles from './order-constructor.module.css'
import ConstructorComposition from "../ConstructorComposition/constructor-composition";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ingredientsValue } from "../../utils/ingredients-value";



function OrderConstructor() {


  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Соберите бургер</h1>
        <div className={styles.shop}>
          <DndProvider backend={HTML5Backend}>
            <ConstructorComposition/>
            <BurgerConstructor/>
          </DndProvider>
        </div>
      </div>
    </main>
  );
}


OrderConstructor.propTypes = ingredientsValue;

export default OrderConstructor;





