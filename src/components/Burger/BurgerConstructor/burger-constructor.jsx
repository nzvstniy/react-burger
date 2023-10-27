import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../OrderDetails/order-details';
import Modal from '../../Modal/modal';
import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INGREDIENT, ADD_INGREDIENT, RESET } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-reducer';
import { getBunSelect, getIngredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { v4 as uuidv4 } from 'uuid';
import DND_TYPES from '../../../utils/dnd-types';
import { useDrop } from 'react-dnd';
import BunSelect from '../BunSelectConstructor/bun-select-constructor';
import { sendOrder } from '../../../services/reducer-selector-directory/orderDetails/order-details-reducer';
import { loading } from '../../../services/reducer-selector-directory/orderDetails/order-details-selector';
import { useModal } from '../../../custom-hooks/useModal';
import IngredientSelectConstructor from '../IngredientSelectConstructor/ingredient-select-constructor';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../../services/reducer-selector-directory/user/user-selector';
import { ROUTES } from '../../../utils/api';
import priceCounter from '../../../utils/calculate/price-counter';


let previousBunId = '';


function BurgerConstructor({ }) {

  const { isModalOpen, modalOpen, modalClose } = useModal();

  const dispatch = useDispatch();
  const status = useSelector(loading);

  const bunSelect = useSelector(getBunSelect);
  const ingredientsSelect = useSelector(getIngredientsSelect);

  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const user = useSelector(checkUser);

  const totalPrice = useMemo(() => priceCounter('bun', bunSelect) + priceCounter('ingredients', ingredientsSelect),
    [bunSelect, ingredientsSelect]
  );

  useEffect(() => {
    setIsDisabled(!ingredientsSelect.length || !bunSelect);
  }, [bunSelect, ingredientsSelect]
  );


  const [{ isOver, ingredientDrop }, drop] = useDrop(
    () => ({
      accept: DND_TYPES.INGREDIENT,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient) => {
        dispatch(ADD_INGREDIENT({ ingredient, key: uuidv4() }));
      },
    }),
    []
  );



  const removeIngredient = ({ key, }) => {
    dispatch(REMOVE_INGREDIENT({ key }));
  };

  const handleNewOrder = (event) => {
    event.preventDefault();

    if (!user) {
      navigate(ROUTES.sign.in);
    }
    else {
      const order = [bunSelect, ...ingredientsSelect].map((ingredientSelect) => ingredientSelect._id);
      dispatch(sendOrder(order))
        .then((res) => {
          if (res.payload.success) dispatch(RESET());
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
      modalOpen();
    }
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
                <span className="text text_type_main-small">Добавьте начинку</span>
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
              <span className="text text_type_main-medium">{totalPrice}</span>
              <CurrencyIcon />
            </div>
            <Button htmlType="submit" type="primary" size="large" disabled={isDisabled}>
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

export default BurgerConstructor;
