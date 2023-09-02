import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layout.module.css';

const Card = ({ data, updateConstructor, modalOpen }) => {

  const clickHandler = () => {
    updateConstructor(data);
    modalOpen(data);
  };


  return (
    <button className={`${styles.wrapper} btn-default`} onClick={clickHandler}>
      <img src={data.image} alt="" className={`${styles.photo_img} mr-4 ml-4`} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </button>
  );
};

Card.propTypes = {
  data: PropTypes.object,
  updateConstructor: PropTypes.func,
  modalOpen: PropTypes.func
};

export default Card;
