import AppHeader from "../../components/AppHeader/app-header";
import IngredientDetails from "../../components/IngredientDetails/ingredient-details";
import styles from './ingredient-details.module.css';

function IngredientDetailsPage() {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <IngredientDetails isPageSingle />
        </main>
      </>
    );
  }
  
  export default IngredientDetailsPage;