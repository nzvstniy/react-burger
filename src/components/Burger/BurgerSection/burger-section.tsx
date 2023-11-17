import { ForwardRefExoticComponent, ReactElement, RefAttributes, forwardRef } from 'react';

import BurgerIngredient from '../BurgerIngredient/burger-ingredient';
import { useGetIngredientsQuery } from '../../../services/reducer-selector-directory/ingredients/ingredients-reducer';

import styles from './burger-section.module.css';
import { IIngredientsTab } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';


const BurgerSection: ForwardRefExoticComponent<Omit<IIngredientsTab, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef(({ type, globalType }, ref): ReactElement => {
    const { data } = useGetIngredientsQuery();
    const ingredients = data?.data || [];

    return (
        <section aria-label={type} ref={ref}>
            <h2 className="text text_type_main-medium">{type}</h2>
            <div className={styles.content}>
                {ingredients
                    .filter(({ type }) => type === globalType)
                    .map((ingredient) => (
                        <BurgerIngredient
                            key={ingredient?._id}
                            ingredient={ingredient}
                        />
                    ))}
            </div>
        </section>
    );
});

export default BurgerSection;
