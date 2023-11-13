import Preload from "../../components/Preload/preload";
import AppHeader from "../../components/AppHeader/app-header";
import OrderConstructor from "../../components/OrderConstructor/order-constructor";
import styles from './home.module.css'
import { useGetIngredientsQuery } from "../../services/reducer-selector-directory/ingredients/ingredients-reducer";

function HomePage() {

    const { loading, error } = useGetIngredientsQuery();

    if (error) {
        throw new Error(`Ошибка ${error.error}`)
    }

    return (
        <>
            <AppHeader />
            {loading ?
                (<div className={styles.preload}><Preload /></div>) : <OrderConstructor />
            }
        </>
    )

}

export default HomePage;