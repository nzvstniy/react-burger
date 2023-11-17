import AppHeader from "../../../components/AppHeader/app-header";
import Sidebar from "../../../components/Sidebar/sidebar";
import styles from './profile.module.css'
import { Outlet } from "react-router-dom";

const ProfilePage = () => (
    <>
        <AppHeader />
        <main>
            <div className={styles.wrapper}>
                <Sidebar description="В этом разделе вы можете изменить свои персональные данные" />
                <Outlet />
            </div>
        </main>
    </>

)

export default ProfilePage;