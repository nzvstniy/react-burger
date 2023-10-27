import Modal from '../Modal/modal';
import styles from './constructor-composition.module.css'
import { useCallback, useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/ingredient-details';
import BurgerSection from '../Burger/BurgerSection/burger-section';
import { useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } from '../../services/reducer-selector-directory/currentIngredient/current-ingredient-reducer';
import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal';


function ConstructorComposition({ ingredientCounter }) {

  const dispatch = useDispatch();
  const { isModalOpen, modalOpen, modalClose } = useModal();

  const [currentTab, setCurrentTab] = useState('one');


  const tabsRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const tab = [
    { type: 'Булки', globalType: 'bun', value: 'one', ref: bunRef },
    { type: 'Соусы', globalType: 'sauce', value: 'two', ref: sauceRef },
    { type: 'Начинки', globalType: 'main', value: 'three', ref: mainRef },
  ];


  const scrollTab = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

   const handleScrollTab = () => {
    const difference = 50;

    const tabsBottomEdge = tabsRef.current?.getBoundingClientRect().bottom;
    const bunsTopEdge = bunRef.current?.getBoundingClientRect().top;
    const saucesTopEdge = sauceRef.current?.getBoundingClientRect().top;
    const mainTopEdge = mainRef.current?.getBoundingClientRect().top;

    const [bun, sauce, main] = tab;

    const setTabValue = (sectionValue, selectedTab) => {
      if (
        tabsBottomEdge &&
        sectionValue - tabsBottomEdge <= difference
      ) {
        setCurrentTab(selectedTab);
      }
    };

    if (bunsTopEdge) setTabValue(bunsTopEdge, bun.value);
    if (saucesTopEdge) setTabValue(saucesTopEdge, sauce.value);
    if (mainTopEdge) setTabValue(mainTopEdge, main.value);
  };

  const handleModalOpen = useCallback((event, ingredient) => {
    if (event.type === 'click' || event?.key === 'Enter') {
      dispatch(SHOW_INGREDIENT_DETAILS(ingredient));
      modalOpen()
    }
  }, []);

  const handleModalClose = () => {
    modalClose()
  };

  const resetModal = () => {
    if (modalOpen) return;

    dispatch(RESET_INGREDIENT_DETAILS());
  };

  return (
    <>
      <section aria-label="Ингредиенты бургера">
        <div className={styles.wrapper}>
          <div className={styles.tabs} ref={tabsRef}>
            {tab.map(({ type, globalType, value, ref }) => (
                <Tab
                  key={`tab-${globalType}`}
                  active={currentTab === value}
                  onClick={() => scrollTab(ref)}
                >
                  {type}
                </Tab>
            ))}
          </div>
          <div className={`${styles.ingredients} my-scroll`} onScroll = {handleScrollTab}>
            {tab.map(({ type, globalType, ref }) => (
              <BurgerSection
                key={globalType}
                type={type}
                ref={ref}
                globalType={globalType}
                modalOpen={handleModalOpen}
                ingredientCounter={ingredientCounter}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal
        title="Детали ингредиента"
        id="ingredient-details"
        setModal={isModalOpen}
        modalClose={handleModalClose}
        resetData={resetModal}
      >
        <IngredientDetails />
      </Modal>
    </>
  );
};

ConstructorComposition.propTypes = {
  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
};

export default ConstructorComposition;
