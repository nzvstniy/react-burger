import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkUser, checkAuthStatus } from '../services/reducer-selector-directory/user/user-selector';
import { ROUTES } from '../utils/api';
import Preload from '../components/Preload/preload';
import styles from './../pages/home/home.module.css'
import { useStoreSelector } from '../services/hooks';

interface IProtectedRouteProps {
    component: React.ReactElement;
    notAuth?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ component, notAuth = false }) => {

    const location = useLocation();
    const isAuthChecked = useStoreSelector(checkAuthStatus);
    const user = useStoreSelector(checkUser);

    const { from } = location.state || { from: { pathname: ROUTES.home } };

    if (user && notAuth) {
        return <Navigate to={from} />
    }
    if (!user && !notAuth) {
        return <Navigate to={ROUTES.sign.in} state={{ from: location }} />
    }

    if (!isAuthChecked) return (<div className={styles.preload}><Preload /></div>) 

    return component;
}


export const NotAuth = ({ component, }: { component: React.ReactElement }) => <ProtectedRoute notAuth component={component} />
export const Auth = ProtectedRoute;
