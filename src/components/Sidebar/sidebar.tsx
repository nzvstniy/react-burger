import { Link, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../utils/api';
import styles from './sidebar.module.css';
import { logout } from '../../services/reducer-selector-directory/user/user-thunk';
import { isLoading } from '../../services/reducer-selector-directory/user/user-selector';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import classNames from 'classnames';

interface ISidebarProps {
    description: string;
}

interface ILinks {
    name: string;
    url: string;
}

const links: ILinks[] = [
    {
        name: 'Профиль',
        url: ROUTES.user.profile,
    },
    {
        name: 'История заказов',
        url: ROUTES.user.orders,
    },

];

const Sidebar = ({ description }: ISidebarProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        dispatch(logout())
            .then(() => navigate(`${ROUTES.sign.in}`))
            .catch((error) => console.error(`Ошибка: ${error}`));
    }

    return (
        <nav className={styles.nav}>
            <ul className={`${styles.links} text_type_main-medium text_color_inactive`}>
                {links.map(({ name, url }) => (
                    <li className={styles.itemLinks} key={uuidv4()}>
                        <Link className={classNames(styles.link, {
                            [styles.activeLink]: location.pathname.endsWith(url),
                        })}
                            to={url}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
                <li className={styles.itemLinks}>
                    <button
                        className={`${styles.link} ${styles.button} text_type_main-medium`}
                        type="button"
                        onClick={onLogout}
                        disabled={useAppSelector(isLoading)}
                    >
                        Выход
                    </button>
                </li>
            </ul>
            <p className={`${styles.description} text_type_main-default text_color_inactive`}>{description}</p>
        </nav>
    );

}

export default Sidebar