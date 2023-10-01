import React, { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css';
import PropTypes from 'prop-types';
import BurgerConstructor from '../Burger/BurgerConstructor/burger-constructor';
import BurgerIngredient from '../Burger/BurgerIngredient/burger-ingredients';
import AppHeader from '../AppHeader/app-header';
import Columns from './column';
import IngredientDetails from '../Ingredients/IngredientDetails/ingredient-details';
import OrderDetails from '../OrderDetails/order-details';
import Modal from '../Modal/modal';

function App() {

  async function fetchApi() {
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients/')
        .then(async res => {
          if (res.ok) {
            const data = await res.json();
            setIngredient(data.data);
          }
          return Promise.reject(`Status ${res.status}`);
        })
    } catch (err) {
      console.log(err);
    }
  }
  /*


  if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
          }
          const data = await res.json();
          setIngredient(data.data);

  async function fetchApi()  {
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients/')
      const data = await res.json() ;
      setIngredient(data.data) ;
    } catch (err) {
      console.log(err);
    } 
  } 
  */
  useEffect(() => {
    fetchApi();
  }, []);

  const [ingredient, setIngredient] = useState([]);

  const [ingredientData, setIngData] = useState(null);

  const [constructorState, setConstructorState] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const openDescription = data => {
    setOpen(true);
    setIngData(data);
  };

  const modalClose = () => {
    setOpen(false);
    setIngData(null);
  };
  const openOrder = () => {
    setOpen(true);
  };

  const updateData = useCallback(ingredientData => {
    setConstructorState([...constructorState, ingredientData]);
  });


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Columns>
          <BurgerIngredient
            ingredient={ingredient}
            updateConstructor={updateData}
            modalOpen={openDescription}
          />
          <BurgerConstructor data={constructorState} modalOpen={openOrder} />
        </Columns>
        {!!isOpen && !!ingredientData && (
          <Modal title="Детали ингредиента" modalClose={modalClose}>
            <IngredientDetails data={ingredientData} />
          </Modal>
        )}
        {!!isOpen && ingredientData === null && (
          <Modal modalClose={modalClose}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </div>
  );
}

App.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.object)
};

export default App;
