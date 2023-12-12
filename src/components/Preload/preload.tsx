import { CircleLoader } from 'react-spinners';
import styles from './preload.module.css'
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
}

const Preload = () => (
  <div className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.preload}>
        <CircleLoader
          color={"#c33ceb"}
          cssOverride={override}
          size={150}
          aria-label="isLoading Spinner"
          data-testid="load"
        />
      </div>
    </div>
  </div>


)


export default Preload;