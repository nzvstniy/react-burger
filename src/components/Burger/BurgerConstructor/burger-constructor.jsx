import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../OrderDetails/order-details';
import Modal from '../../Modal/modal';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INGREDIENT, ADD_INGREDIENT } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-reducer';
import PropTypes from 'prop-types';
import { getBunSelect, getingredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { v4 as uuidv4 } from 'uuid';
import DND_TYPES from '../../../utils/dnd-types';
import { useDrop } from 'react-dnd';
import BunSelect from '../BunSelectConstructor/bun-select-constructor';
import { sendOrder } from '../../../services/reducer-selector-directory/orderDetails/order-details-reducer';
import { loading } from '../../../services/reducer-selector-directory/orderDetails/order-details-selector';
import { useModal } from '../../../hooks/useModal';

import IngredientSelectConstructor from '../IngredientSelectConstructor/ingredient-select-constructor';

let previousBunId = '';


function BurgerConstructor({ ingredientCounter, onCount, }) {

  const { isModalOpen, modalOpen, modalClose } = useModal();
  const [totalPrice, setTotalPrice] = useState(0);

  const [lastBunPrice, setLastBunPrice] = useState(0);

  const dispatch = useDispatch();
  const status = useSelector(loading);

  const bunSelect = useSelector(getBunSelect);
  const ingredientsSelect = useSelector(getingredientsSelect);


  const totalPriceIncrease = ({ type, price }) => {
    if (type === 'bun') {
      const bunPrice = price * 2;

      if (lastBunPrice) {
        setTotalPrice(totalPrice - lastBunPrice + bunPrice);
        setLastBunPrice(bunPrice);
      } else {
        setTotalPrice(totalPrice + bunPrice);
        setLastBunPrice(bunPrice);
      }
    } else {
      setTotalPrice(totalPrice + price);
    }
  };

  const totalPriceDecrease = (price) => {
    setTotalPrice(totalPrice - price);
  };

  const counterIncrease = ({ _id, type }) => {
    let value = ingredientCounter.get(_id);

    if (type === 'bun' && value) return 2;

    if (type === 'bun') {
      ingredientCounter.set(previousBunId, 0);
      previousBunId = _id;
      return 2;
    }

    value = value ? (value += 1) : 1;
    return value;
  };

  const [{ isOver, ingredientDrop }, drop] = useDrop(
    () => ({
      accept: DND_TYPES.INGREDIENT,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient) => {
        dispatch(ADD_INGREDIENT({ ingredient, key: uuidv4() }));

        onCount(
          new Map(
            ingredientCounter.set(
              ingredient._id,
              counterIncrease(ingredient)
            )
          )
        );
        totalPriceIncrease(ingredient);
      },
    }),
    [ingredientCounter]
  );



  const removeIngredient = ({ key, _id, price }) => {
    dispatch(REMOVE_INGREDIENT({ key }));

    const value = ingredientCounter.get(_id) - 1;
    onCount(new Map(ingredientCounter.set(_id, value)));
    totalPriceDecrease(price);
  };

  const handleNewOrder = (event) => {
    event.preventDefault();

    const order = [bunSelect, ...ingredientsSelect].map(
      (ingredientsSelect) => ingredientsSelect._id
    );
    dispatch(sendOrder(order));
    modalOpen()
  }


  const handleModalClose = () => {
    modalClose()
  };




  return (
    <>
      <section aria-label="Оформление заказа">
        <form className={styles.order} ref={drop} onSubmit={handleNewOrder}>
          <BunSelect
            bunSelect={bunSelect}
            isOver={isOver}
            ingredientDrop={ingredientDrop}
            posRu="верхняя"
            posEng="top"
          />

          {(ingredientsSelect.length && (
            <div className={`${styles.components} my-scroll`}>
              {ingredientsSelect.map((ingredient, index) => (
                <IngredientSelectConstructor
                  key={`component-${ingredient.key}`}
                  ingredient={ingredient}
                  index={index}
                  removeIngredient={() => removeIngredient(ingredient)}
                />
              ))}
            </div>
          )) || (
              <div
                className={`${styles.componentsEmpty}${(isOver &&
                  ingredientDrop !== 'bun' &&
                  ` ${styles.containerEmptyDrop}`) ||
                  ''
                  }`}
              >
                <span>Добавьте начинку</span>
              </div>
            )}

          <BunSelect
            bunSelect={bunSelect}
            isOver={isOver}
            ingredientDrop={ingredientDrop}
            posRu="нижняя"
            posEng="bottom"
          />

          <div className={styles.info}>
            <div className={styles.price}>
              <span>{totalPrice}</span>
              <CurrencyIcon />
            </div>
            <Button htmlType="submit" type="primary" size="large">
              {status ? 'Загрузка...' : 'Оформить заказ'}
            </Button>
          </div>
        </form>
      </section>

      <Modal

        id="order-details"
        setModal={isModalOpen}
        modalClose={handleModalClose}
        loading={status}
      >

        <OrderDetails />
      </Modal>


    </>
  );
};

BurgerConstructor.propTypes = {

  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
  onCount: PropTypes.func.isRequired,
};
export default BurgerConstructor;
