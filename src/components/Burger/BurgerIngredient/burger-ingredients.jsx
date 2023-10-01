import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Grid from '../../Ingredients/IngredientLayout/grid';
const BurgerIngredient = ({ ingredient, updateConstructor, modalOpen }) => {
  const [current, setCurrent] = useState('one');

  return (
    <section className={styles.section}>
      <h1 className={`${styles.heading} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.wrapper} my-scroll mt-10 pr-2 `}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Булочки</h2>
        <Grid
          type={'bun'}
          ingredient={ingredient}
          updateConstructor={updateConstructor}
          modalOpen={modalOpen}
        />
        <h2 className={`${styles.heading} text text_type_main-medium`}>Соус</h2>
        <Grid
          type={'sauce'}
          ingredient={ingredient}
          updateConstructor={updateConstructor}
          modalOpen={modalOpen}
        />
        <h2 className={`${styles.heading} text text_type_main-medium`}>Начинка</h2>
        <Grid
          type={'main'}
          ingredient={ingredient}
          updateConstructor={updateConstructor}
          modalOpen={modalOpen}
        />
      </div>
    </section>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.object),
  updateConstructor: PropTypes.func,
  modalOpen: PropTypes.func
};

export default BurgerIngredient;
