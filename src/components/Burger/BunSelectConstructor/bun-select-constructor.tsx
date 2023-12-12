
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './bun-select-constructor.module.css'
import { IIngredient, IIngredientId } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';
import { FC } from 'react';


interface IBunSelectProps {
    bunSelect: IIngredientId | null;
    isOver: boolean;
    ingredientDrop: string;
    posRu: 'верхняя' | 'нижняя';
    posEng: 'top' | 'bottom';
}

const BunSelect: FC<IBunSelectProps> = ({
    bunSelect,
    isOver,
    ingredientDrop,
    posRu,
    posEng,
}) =>

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
            className={`${styles.containerBun} 
            ${(posEng === 'top' && styles.bunTop) || styles.bunBottom}
            ${(isOver && ingredientDrop === 'bun' && ` ${styles.containerEmptyDrop}`) || ''}`}
        >
            <span className="text text_type_main-small">Добавьте булку</span>
        </div>
    )

export default BunSelect;