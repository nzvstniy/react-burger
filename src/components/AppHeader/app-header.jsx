import React from 'react';
import {
  ListIcon,
  BurgerIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headCont} pt-4 pb-4`}>
        <nav className={styles.links}>
          <div className={`${styles.start} pt-4 pr-5 pb-4 pl-5`}>
            <a href="#">
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default text_color_active pl-2">Конструктор</span>
            </a>
          </div>
          <div className={`${styles.start} pt-4 pr-5 pb-4 pl-5`}>
            <a href="#">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span>
            </a>
          </div>
        </nav>
        <div className={styles.logo}>
          <a href="#">
            <Logo />
          </a>
        </div>
        <div className={styles.account}>
          <div className={`${styles.end} `}>
            <a href="#">
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span>
            </a>


          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
