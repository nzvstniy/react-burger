import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUser, checkAuthStatus } from '../services/reducer-selector-directory/user/user-selector';
import { ROUTES } from '../utils/api';
import Preload from '../components/Preload/preload';
import styles from './../pages/home/home.module.css'



function ProtectedRoute({ component, notAuth = false }) {
    const location = useLocation();
    const isAuthChecked = useSelector(checkAuthStatus);
    const user = useSelector(checkUser);

    const { from } = location.state || { from: { pathname: ROUTES.home } };

    const isPasswordReset = location.pathname.endsWith(
        ROUTES.password.reset
    );

    const isPasswordForgot = JSON.parse(
        localStorage.getItem('passwordForgot')
    );

    if (user && notAuth) {
        return <Navigate to={from} />
    }
    if (!user && !notAuth) {
        return <Navigate to={ROUTES.sign.in} state={{ from: location }} />
    }
    if (notAuth && !user && isPasswordReset && !isPasswordForgot) {
        return <Navigate to={ROUTES.sign.in} />;
    }
    if (!isAuthChecked) return (<div className={styles.preload}><Preload /></div>)

    return component;
}

export const Auth = ProtectedRoute;

export function NotAuth({ component }) {
    return <ProtectedRoute notAuth component={component} />
}

NotAuth.propTypes = {
    component: PropTypes.node.isRequired,
};

ProtectedRoute.propTypes = {
    notAuth: PropTypes.bool,
    component: PropTypes.node.isRequired,
};

ProtectedRoute.defaultProps = {
    notAuth: false,
}