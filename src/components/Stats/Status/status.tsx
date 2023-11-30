import styles from './status.module.css';

interface IStatusProps {
    heading: React.ReactElement<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLHeadingElement>,
            HTMLHeadingElement
        >
    >;
    orders: number[];
    listColor: 'blue' | 'white';
}

const Status = ({ heading, orders, listColor }: IStatusProps) => {
    const list = orders.map((num) => (
        <li key={num} className={styles.item}>
            {num}
        </li>
    ));

    return (
        <div>
            {heading}
            <ul
                className={`text text_type_digits-default ${styles.list} ${styles[listColor]}`}
            >
                {list}
            </ul>
        </div>
    );
};

export default Status;