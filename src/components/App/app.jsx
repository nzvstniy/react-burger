import AppHeader from '../AppHeader/app-header';
import OrderConstructor from '../OrderConstructor/order-constructor';
import { useGetIngredientsQuery } from '../../services/reducer-selector-directory/ingredients/ingredients-reducer';
import Preload from '../Preload/preload';
import styles from './app.module.css'


function App() {
  const { loading, error } = useGetIngredientsQuery();
  if (error) {
    throw new Error(`Error status ${error.status}`);
  }
  return (
    <>
      <AppHeader />
      {loading ?
        (<div className={styles.preload}><Preload /></div>) : <OrderConstructor />
      }
    </>
  );
}

export default App;