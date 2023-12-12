import Sidebar from "../../../components/Sidebar/sidebar";
import styles from './profile.module.css'
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../../utils/api";
import classNames from "classnames";
const ProfilePage = () => {

    const { pathname } = useLocation();
    const isProfileRoute = pathname.endsWith(ROUTES.user.profile);
    const isOrdersRoute = pathname.endsWith(ROUTES.user.orders);

    let description = '';
    if (isProfileRoute){
        description = 'В этом разделе вы можете изменить свои персональные данные';
    }
    if (isOrdersRoute){
        description = 'В этом разделе вы можете просмотреть свою историю заказов';
    }
    return (
        <>
          <main>
            <div
              className={classNames(styles.wrapper, {
                [styles.orders]: isOrdersRoute,
              })}
            >
              <Sidebar description={description} />
              <Outlet />
            </div>
          </main>
        </>
      );
}

export default ProfilePage;