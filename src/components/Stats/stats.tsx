import { useAppSelector } from "../../services/hooks";
import { getOrderFeed } from "../../services/reducer-selector-directory/orderFeed/order-feed-selector";
import Status from "./Status/status";
import styles from './stats.module.css'
import Report from "./Report/report";

const maxOrdersNum = 12;

const Stats = () => {
    const ordersAreDone: number[]=[];
    const ordersInProgress: number[]=[];
    const feedOrdersData = useAppSelector(getOrderFeed);
    
    if(!feedOrdersData) return null;
    feedOrdersData.orders.slice(0, maxOrdersNum).forEach(({ status, number }) => 
    status === 'done' ? ordersAreDone.push(number) : ordersInProgress.push(number)
    );

    return (
        <section className={styles.section} aria-label="Статистика заказов">
          <div className={styles.status}>
            <Status
              heading={<h2 className="text text_type_main-medium">Готовы:</h2>}
              orders={ordersAreDone}
              listColor="blue"
            />
            <Status
              heading={<h2 className="text text_type_main-medium">В работе:</h2>}
              orders={ordersInProgress}
              listColor="white"
            />
          </div>
          <Report
            heading={
              <h2 className="text text_type_main-medium">
                Выполнено за все время:
              </h2>
            }
            counter={feedOrdersData.total}
          />
          <Report
            heading={
              <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            }
            counter={feedOrdersData.totalToday}
          />
        </section>
      );
}

export default Stats;
