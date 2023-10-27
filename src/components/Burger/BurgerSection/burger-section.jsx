import { forwardRef } from 'react';

import BurgerIngredient from '../BurgerIngredient/burger-ingredient';
import { useGetIngredientsQuery } from '../../../services/reducer-selector-directory/ingredients/ingredients-reducer';
import PropTypes from 'prop-types';

import styles from './burger-section.module.css';

const BurgerSection = forwardRef(
    ({ type, globalType, ...rest }, ref) => {
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
                                {...rest}
                            />
                        ))}
                </div>
            </section>
        );
    }
);

BurgerSection.propTypes = {
    type: PropTypes.string,
    globalType: PropTypes.string,
};

export default BurgerSection;
