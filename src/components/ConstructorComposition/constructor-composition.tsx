import styles from './constructor-composition.module.css'
import { useState, useRef, FC, ReactElement, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerSection from '../Burger/BurgerSection/burger-section';
import { IIngredientsTab } from '../../services/reducer-selector-directory/ingredients/ingredients-types';

interface ITab extends IIngredientsTab {
  value: string;
}

const ConstructorComposition = () => {

  const [currentTab, setCurrentTab] = useState('one');


  const tabsRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const tab: ITab[] = [
    { type: 'Булки', globalType: 'bun', value: 'one', ref: bunRef },
    { type: 'Соусы', globalType: 'sauce', value: 'two', ref: sauceRef },
    { type: 'Начинки', globalType: 'main', value: 'three', ref: mainRef },
  ];


  const scrollTab = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
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

    const setTabValue = (sectionValue: number, selectedTab: string) => {
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


  return (
    <section aria-label="Ингредиенты бургера">
      <div className={styles.wrapper}>
        <div className={styles.tabs} ref={tabsRef}>
          {tab.map(({ type, globalType, value, ref }) => (
            <Tab
              key={`tab-${globalType}`}
              active={currentTab === value}
              onClick={() => scrollTab(ref)}
              value={value}
            >
              {type}
            </Tab>
          ))}
        </div>
        <div className={`${styles.ingredients} my-scroll`} onScroll={handleScrollTab}>
          {tab.map(({ type, globalType, ref }) => (
            <BurgerSection
              key={globalType}
              type={type}
              ref={ref}
              globalType={globalType}
            />
          ))}
        </div>
      </div>
    </section>

  );
};



export default ConstructorComposition;
