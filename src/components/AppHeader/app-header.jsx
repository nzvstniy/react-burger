import {
  ListIcon,
  BurgerIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/api';
import classNames from 'classnames';
const links = [
  {
    name: 'Конструктор',
    url: ROUTES.home,
    icon: <BurgerIcon type="primary" />,
  },
  {
    name: 'Лента заказов',
    url: ROUTES.orders,
    icon: <ListIcon type="primary" />,
  },

];


function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headCont} `}>
        <div className={`${styles.start} pr-5 pl-5`}>
          <nav className={styles.links}>

            {links.map(({ name, url, icon }) => (
              <div className={styles.sex} key={url}>
                <NavLink
                  className={({ isActive }) =>
                    classNames(styles.navLink, {
                      [styles.activeNavLink]: isActive,
                    })
                  }
                  to={url}
                  
                >
                  {icon}



                  <span className="text text_type_main-default">{name}</span>
                </NavLink>

              </div>
            ))}
           

          </nav>

          <NavLink to={ROUTES.home}>
            <Logo />
          </NavLink>

        </div>


        <div className="pr-10">
          <NavLink
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.activeNavLink]: isActive,
              })
            }
            to={ROUTES.user.profile}
          >
            <ProfileIcon type="primary" />
            <span className="text text_type_main-default ">Личный кабинет</span>
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default memo(AppHeader);
