import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {ConstructorElement, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
  
import { CHANGE_POSITION } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-reducer';

import { ingredientConstructorValue } from '../../../utils/ingredients-value';

import DND_TYPES from '../../../utils/dnd-types';

import styles from './ingredient-select-constructor.module.css'

function IngredientSelectConstructor({ingredient, index, removeIngredient}){
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { _id } = ingredient;

    const [{ handlerId }, drop] = useDrop({
        accept: DND_TYPES.SORTING_INGREDIENT,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),hover(item, monitor) {
            if (!ref.current) return;
      
            const dragIndex = item.index;

            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;
      
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (
              (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
              (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) {
              return;
            }
            dispatch(CHANGE_POSITION({ dragIndex, hoverIndex }));
            item.index = hoverIndex;
          },
        });
      
        const [{ isDragging }, drag] = useDrag({
          type: DND_TYPES.SORTING_INGREDIENT,
          item: { _id, index },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
        });
      
        drag(drop(ref));
      
        return (
          <div
            className={`${styles.item}${
              (isDragging && ` ${styles.itemDragging}`) || ''
            }`}
            key={`container-${ingredient.key}`}
            ref={ref}
            data-handler-id={handlerId}
          >
            <DragIcon key={`icon-${ingredient.key}`} type="primary" />
            <ConstructorElement
              key={ingredient.key}
              extraClass={styles.constructorElement}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={removeIngredient}
            />
          </div>
        );
      }
      
      IngredientSelectConstructor.propTypes = {
        ingredient: ingredientConstructorValue.isRequired,
        index: PropTypes.number.isRequired,
        removeIngredient: PropTypes.func.isRequired,
      };
      
      export default IngredientSelectConstructor;