import { ROUTES } from "../api";

export const getIconType = (location: string, navPath: string): 'primary' | 'secondary' => {
    if (location === ROUTES.home && navPath === 'home') {
        return 'primary';
    } else if (location === ROUTES.orders && navPath === 'feed') {
        return 'primary';
    } else if (location === ROUTES.user.profile && navPath === 'profile') {
        return 'primary';
    }
    return 'secondary';
};