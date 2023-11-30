import OrderConstructor from "../../components/OrderConstructor/order-constructor";
import Preload from "../../components/Preload/preload";
import { useGetIngredientsQuery } from "../../services/reducer-selector-directory/ingredients/ingredients-reducer";
import styles from './home.module.css'
const HomePage = () => {

    const { isLoading, error } = useGetIngredientsQuery();

    if ( error && 'error' in error) {
        throw new Error(`Ошибка ${error.error}`)
    }
    
    return (
        <>
            {isLoading ? <Preload /> : <OrderConstructor />
            }
        </>
    )

}

export default HomePage;