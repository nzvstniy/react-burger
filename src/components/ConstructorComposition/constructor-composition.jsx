import Modal from '../Modal/modal';
import styles from './constructor-composition.module.css'
import ingredientsValue from '../../utils/ingredients-value';
import { useCallback, useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../Burger/BurgerIngredient/burger-ingredient';
import IngredientDetails from '../IngredientDetails/ingredient-details';


function ConstructorComposition({ data, ingredientSelect, bunSelect, totalPriceDispatcher, setBunSelect, setIngredientSelect }) {
  const [current, setCurrent] = useState('one');
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [detailsModalOpen, setDetailsModalOpen] =
    useState(false);

  const tab = [
    { type: 'Булки', globalType: 'bun', value: 'one' },
    { type: 'Соусы', globalType: 'sauce', value: 'two' },
    { type: 'Начинки', globalType: 'main', value: 'three' },
  ];

  const handleModalOpen = useCallback(
    (event, id) => {
      if (event.type === 'click') {
        setCurrentIngredient(data.find((ingredient) => ingredient._id === id));
        setDetailsModalOpen(true);
      }
    },
    [data]
  );

  const handleModalClose = () => {
    setDetailsModalOpen(false);
  };

  useEffect(() => {
    if (detailsModalOpen) return;

    setTimeout(() => setCurrentIngredient({}), 300);
  }, [detailsModalOpen]);

  return (
    <>
      <section aria-label="Ингредиенты бургера">
        <div className={styles.wrapper}>
          <div className={styles.tabs}>
            {tab.map(({ type, globalType, value }) => (
              <a key={`link-${globalType}`} href={`#${value}`}>
                <Tab
                  key={`tab-${globalType}`}
                  value={value}
                  active={current === value}
                  onClick={setCurrent}
                >
                  {type}
                </Tab>
              </a>
            ))}
          </div>
          <div className={`${styles.tab} my-scroll`}>
            {tab.map(({ type, globalType, value }) => (
              <section
                key={globalType}
                aria-label={type}
              >
                <h2 className={styles.heading} id={value}>
                  {type}
                </h2>
                <div className={styles.content}>
                  {data
                    .filter(({ type }) => type === globalType)
                    .map(({ _id, name, image, price, type }) => (
                      <BurgerIngredient
                        key = {_id}
                        _id = {_id}
                        name = {name}
                        type = {type}
                        link = {image}
                        price = {price}
                        ingredientSelect = {ingredientSelect}
                        bunSelect = {bunSelect}
                        setIngredientSelect = {setIngredientSelect}
                        setBunSelect = {setBunSelect}
                        totalPriceDispatcher = {totalPriceDispatcher}
                        modalOpen = {handleModalOpen}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Modal
        title = "Детали ингредиента"
        id="ingredient-details"
        setModal={detailsModalOpen}
        modalClose={handleModalClose}
      >
        <IngredientDetails currentIngredient={currentIngredient} />
      </Modal>
    </>
  );
};

ConstructorComposition.propTypes = ingredientsValue;

export default ConstructorComposition;
