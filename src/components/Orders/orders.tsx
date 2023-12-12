import { Link, useLocation } from "react-router-dom";
import OrderCards from "../OrderCards/order-cards";
import { IIngredient } from "../../services/reducer-selector-directory/ingredients/ingredients-types";
import { useGetIngredientsQuery } from "../../services/reducer-selector-directory/ingredients/ingredients-reducer";
import { TWebSocketOrders } from "../../services/reducer-selector-directory/orderFeed/order-feed-type";
import styles from './orders.module.css'

interface IOrdersProps {
    ordersData: TWebSocketOrders;
    dynamicRoute: string;
    status: boolean;
}

const Orders = ({
    ordersData,
    status,
    dynamicRoute,
}: IOrdersProps) => {
    const { data } = useGetIngredientsQuery();
    const location = useLocation();

    const map = new Map<string, IIngredient>();
    data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

    return (
        <section
            className={`${styles.section} my-scroll`}
            aria-label="Список сделанных заказов"
        >
            {!!map.size &&
                ordersData.orders.map((order) => {
                    let previewIcons: string[] = [];
                    let totalPrice = 0;

                    order.ingredients.forEach((id) => {
                        const { price, image } = map.get(id) as IIngredient || {};

                        totalPrice += price;
                        previewIcons.push(image);
                    });

                    previewIcons = [...new Set(previewIcons)];

                    return (
                        <Link
                            key={order._id}
                            to={`${dynamicRoute}/${order._id}`}
                            state={{ background: location }}
                        >
                            <OrderCards
                                typeInfo="general"
                                number={order.number}
                                name={order.name}
                                images={previewIcons}
                                timestamp={order.createdAt}
                                totalPrice={totalPrice}
                                status={status ? order.status : undefined}
                            />
                        </Link>
                    );
                })}
        </section>
    );
};

export default Orders;