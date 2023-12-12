import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../../OrderDetails/order-details';
import Modal from '../../Modal/modal';
import { useState, useEffect, useMemo, FormEvent } from 'react'
import { REMOVE_INGREDIENT, ADD_INGREDIENT, RESET } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-slice';
import { getBunSelect, getIngredientsSelect } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-selector';
import { v4 as uuidv4 } from 'uuid';
import DndTypes from '../../../utils/dnd-types';
import { useDrop } from 'react-dnd';
import BunSelect from '../BunSelectConstructor/bun-select-constructor';
import sendOrder from '../../../services/reducer-selector-directory/orderDetails/order-details-request';
import { isLoading } from '../../../services/reducer-selector-directory/orderDetails/order-details-selector';
import { useModal } from '../../../custom-hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../../services/reducer-selector-directory/user/user-selector';
import { ROUTES } from '../../../utils/api';
import priceCounter from '../../../utils/assist/price-counter';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { IIngredient, IIngredientId } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';
import IngredientSelect from '../IngredientSelectConstructor/ingredient-select-constructor';
import Price from '../../Price/price';
import classNames from 'classnames';

const BurgerConstructor = () => {

  const { isModalOpen, modalOpen, modalClose } = useModal();

  const dispatch = useAppDispatch();
  const status = useAppSelector(isLoading);

  const bunSelect = useAppSelector(getBunSelect);
  const ingredientsSelect = useAppSelector(getIngredientsSelect);

  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const user = useAppSelector(checkUser);

  const totalPrice = useMemo(() => priceCounter('bun', bunSelect) + priceCounter('ingredients', ingredientsSelect),
    [bunSelect, ingredientsSelect]
  );

  useEffect(() => {
    setIsDisabled(!ingredientsSelect.length || !bunSelect);
  }, [bunSelect, ingredientsSelect]
  );


  const [{ isOver, ingredientDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.Ingredient,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient: IIngredientId) => {
        dispatch(ADD_INGREDIENT({ ingredient, key: uuidv4() }));
      },
    }),
    []
  );



  const removeIngredient = ({ key }: { key: string }) => {
    dispatch(REMOVE_INGREDIENT({ key }));
  };

  const handleNewOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      navigate(ROUTES.sign.in);
      return;
    }
    const token = localStorage.getItem('accessToken');
    if (!bunSelect || !ingredientsSelect.length || !token) return;

    const order = [bunSelect, ...ingredientsSelect, bunSelect].map(
      (ingredientsSelect) => ingredientsSelect._id
    );

    dispatch(sendOrder({ order, token }))
      .then((res) => {
        if (res.payload?.success) dispatch(RESET());
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
    modalOpen();
  };


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
                <IngredientSelect
                  key={`component-${ingredient.key}`}
                  ingredient={ingredient}
                  index={index}
                  removeIngredient={() => removeIngredient(ingredient)}
                />
              ))}
            </div>
          )) || (
            <div
            className={classNames(styles.componentsEmpty, {
              [styles.containerEmptyDrop]:
                isOver && ingredientDrop !== 'bun',
            })}
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
            <Price type="total" totalPrice={totalPrice} size="big" />
            <Button htmlType={ status ? 'button' : 'submit' } type="primary" size="large" disabled={isDisabled}>
              { status ? 'Загрузка...' : 'Оформить заказ' }
            </Button>
          </div>
        </form>
      </section>

      <Modal
        id="order-details"
        setModal={isModalOpen}
        modalClose={handleModalClose}
        isLoading={status}
      >

        <OrderDetails isPending={status}/>
      </Modal>


    </>
  );
};

export default BurgerConstructor;
