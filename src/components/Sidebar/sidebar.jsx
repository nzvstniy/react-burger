import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ROUTES } from '../../utils/api';
import styles from './sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/reducer-selector-directory/user/thunk';
import { loading } from '../../services/reducer-selector-directory/user/user-selector';

const links = [
    {
        name: 'Профиль',
        url: ROUTES.user.profile,
    },
    {
        name: 'История заказов',
        url: ROUTES.user.orders,
    },

];

function Sidebar({ description }) {

    const dispatch = useDispatch();
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
                        <Link className={`${styles.link}${(location.pathname.endsWith(url) && ` ${styles.activeLink}`) ||
                            ''
                            }`}
                            key={uuidv4()}
                            to={url}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
                <li className={styles.itemLinks} key={uuidv4()}>
                    <button
                        className={`${styles.link} ${styles.button} text_type_main-medium`}
                        type="button"
                        onClick={onLogout}
                        disabled={useSelector(loading)}
                    >
                        Выход
                    </button>
                </li>
            </ul>
            <p className={`${styles.description} text_type_main-default text_color_inactive`}>{description}</p>
        </nav>
    );

}

Sidebar.propTypes = {
    description: PropTypes.string.isRequired,
}

export default Sidebar