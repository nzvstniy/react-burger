import PropTypes from 'prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './bun-select-constructor.module.css'




function BunSelect({
    bunSelect,
    isOver,
    ingredientDrop,
    posRu,
    posEng,
}) {
    return (
        (bunSelect && (
            <ConstructorElement
                extraClass={styles.bun}
                type={posEng}
                isLocked
                text={`${bunSelect?.name} (${posRu})`}
                price={bunSelect?.price}
                thumbnail={bunSelect?.image}
            />
        )) || (
            <div
                className={`${styles.containerBun} ${(posEng === 'top' && styles.bunTop) ||
                    styles.bunBottom
                    }${(isOver &&
                        ingredientDrop === 'bun' &&
                        ` ${styles.containerEmptyDrop}`) ||
                    ''
                    }`}
            >
                <span className="text text_type_main-small">Добавьте булку</span>
            </div>
        )
    );
}

BunSelect.propTypes = {
    bunSelect: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
    isOver: PropTypes.bool,
    ingredientDrop: PropTypes.string,
    posRu: PropTypes.string.isRequired,
    posEng: PropTypes.string.isRequired,
};

BunSelect.defaultProps = {
    bunSelect: null,
    isOver: undefined,
    ingredientDrop: undefined,
};

export default BunSelect;