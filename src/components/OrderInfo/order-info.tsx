import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { useGetIngredientsQuery } from "../../services/reducer-selector-directory/ingredients/ingredients-reducer";
import { IIngredient, TIngredientsDetails } from "../../services/reducer-selector-directory/ingredients/ingredients-types";
import { ROUTES } from "../../utils/api";
import Price from "../Price/price";
import { getOrderFeed } from "../../services/reducer-selector-directory/orderFeed/order-feed-selector";
import { getProfileOrderFeed } from "../../services/reducer-selector-directory/profileOrderFeed/profile-order-feed-selector";
import styles from './order-info.module.css';
import getStatus from "../../utils/assist/get-status";
import OrderIngredients from "./OrderIngredients/order-ingredients";

interface IOrderInfoProps {
    orderPosition?: 'start' | 'center';
    isPageSingle?: boolean;
    hasWrapper?: boolean;
}

const OrderInfo = ({
    orderPosition = 'start',
    isPageSingle = false,
    hasWrapper = false,
}: IOrderInfoProps) => {
    const { pathname } = useLocation();
    const { id } = useParams();
    const { data } = useGetIngredientsQuery();

    const isRouteOrderFeed = pathname.includes(ROUTES.orders);

    const map = new Map<string, IIngredient>();
    data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

    const feedOrdersData = useAppSelector(
        isRouteOrderFeed
            ? getOrderFeed
            : getProfileOrderFeed
    );

    if (!map.size || !feedOrdersData) return null;

    const orderFound = feedOrdersData.orders.find(
        (order) => order._id === id
    );

    if (!orderFound)
        return (
            <div className={classNames({ [styles.wrapper]: hasWrapper })}>
                <h1 className={`text text_type_main-medium ${styles.notFoundHeading}`}>
                    Заказ не найден
                </h1>
            </div>
        );

    const { number, name, status, createdAt, ingredients } = orderFound;

    const cardIngredientsDetails: TIngredientsDetails = {};
    let totalPrice = 0;

    ingredients.forEach((ingredientId) => {
        const {
            name: ingredientName,
            price,
            image,
        } = map.get(ingredientId) as IIngredient;
        totalPrice += price;

        cardIngredientsDetails[ingredientId]
            ? (cardIngredientsDetails[ingredientId].number += 1)
            : (cardIngredientsDetails[ingredientId] = {
                name: ingredientName,
                price,
                image,
                number: 1,
            });
    });

    const statusLocal = getStatus(status);

    return (
        <div className={classNames({ [styles.wrapper]: hasWrapper })}>
            <h3
                className={classNames('text text_type_digits-default', {
                    [styles.positionCenter]: orderPosition === 'center',
                })}
            >{`#${number}`}</h3>
            <div
                className={classNames(styles.name, {
                    [styles.namePageSingle]: isPageSingle,
                })}
            >
                <h4 className="text text_type_main-medium">{name}</h4>
                <span
                    className={classNames('text text_type_main-default', {
                        [styles.blue]: status === 'done',
                    })}
                >
                    {statusLocal}
                </span>
            </div>
            <div className={styles.ingredients}>
                <h4 className="text text_type_main-medium">Состав:</h4>
                <OrderIngredients data={cardIngredientsDetails} />
            </div>
            <div className={styles.summary}>
                <FormattedDate
                    className={`text text_type_main-default text_color_inactive ${styles.date}`}
                    date={new Date(createdAt)}
                />
                <Price type="total" totalPrice={totalPrice} size="small" />
            </div>
        </div>
    );
};

export default OrderInfo;