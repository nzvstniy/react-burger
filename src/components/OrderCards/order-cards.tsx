import { v4 as uuidv4 } from 'uuid';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderIcons from './OrderIcons/order-icons';
import getStatus from '../../utils/assist/get-status';
import classNames from 'classnames';
import Price from '../Price/price';
import styles from './order-cards.module.css';

const iconsLimit = 6;

interface ICardOrderGeneral {
  typeInfo: 'general';
  images: string[];
  totalPrice: number;
  timestamp: string;
  number: number;
  name: string;
  status?: 'created' | 'pending' | 'done';
}

interface ICardOrderDetails {
  typeInfo: 'details';
  ingredientName: string;
  ingredientImage: string;
  ingredientPrice: number;
  ingredientNum: number;
}

type TCardOrderProps = ICardOrderGeneral | ICardOrderDetails;

const OrderCards = (props: TCardOrderProps) => {
  const { typeInfo } = props;

  if (typeInfo === 'general') {
    const { number, name, totalPrice, images, timestamp, status } = props;

    const imagesNum = images.length;
    const imagesMore = imagesNum - iconsLimit;

    const preview =
      imagesNum > iconsLimit
        ? images
          .slice(0, iconsLimit)
          .map((image, i) => (
            <OrderIcons
              key={image}
              image={image}
              position={i}
              imagesMore={i + 1 === iconsLimit ? imagesMore : 0}
            />
          ))
        : images.map((image, i) => (
          <OrderIcons key={image} image={image} position={i} />
        ));

    const ingredientStatus = getStatus(status);

    return (
      <article className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</h2>
            <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`} date={new Date(timestamp)} />
          </div>
          <h3 className={`${styles.name} ${styles.nameProfile} text text_type_main-medium`}>{name}</h3>
          {!!ingredientStatus && (
            <span
              className={classNames(
                'text text_type_main-default',
                styles.status,
                { [styles.statusDone]: ingredientStatus === 'Выполнен' }
              )}
            >
              {ingredientStatus}
            </span>
          )}
          <div className={styles.info}>
            <div className={styles.ingredients}>{preview}</div>
            <Price type="total" totalPrice={totalPrice} size="small" />
          </div>
        </div>
      </article>
    );
  }

  const { ingredientImage, ingredientName, ingredientNum, ingredientPrice } = props;

  return (
    <article className={`${styles.card} ${styles.cardDetails} `}>
      <div className={styles.details}>
        <OrderIcons image={ingredientImage} />
        <h4 className={`text text_type_main-default ${styles.ingredientName}`}>
          {ingredientName}
        </h4>
      </div>
      <Price
        type="item"
        number={ingredientNum}
        price={ingredientPrice}
        size="small"
      />
    </article>
  );
};

export default OrderCards;