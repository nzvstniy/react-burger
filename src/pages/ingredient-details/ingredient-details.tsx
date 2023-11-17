import IngredientDetails from "../../components/IngredientDetails/ingredient-details";
import styles from './ingredient-details.module.css';

function IngredientDetailsPage() {
    return (
      <>
        <main className={styles.main}>
          <IngredientDetails isPageSingle />
        </main>
      </>
    );
  }
  
  export default IngredientDetailsPage;