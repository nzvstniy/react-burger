import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/AppHeader/app-header';
import styles from './page-404.module.css';
import Lottie from "lottie-react";
import animationData from './404-animation.json'
function Page404() {
  const navigate = useNavigate();
  
  const lottieStyle ={
    height: 500,
    width: 500,
  }

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <p className={`${styles.paragraph} text text_type_main-large`}>
              Страница не найдена
            </p>

          </div>

          <Lottie
            animationData={animationData}
            loop={true}
            style={lottieStyle}
            autoplay={true}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => navigate(-1)}
          >
            Вернуться назад
          </Button>
        </div>
      </main>
    </>
  );
}

export default Page404;