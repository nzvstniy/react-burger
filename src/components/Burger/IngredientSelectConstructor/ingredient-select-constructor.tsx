import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier } from 'dnd-core';
import { ConstructorElement, DragIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import { CHANGE_POSITION } from '../../../services/reducer-selector-directory/ingredientsSelect/select-ingredient-slice';
import DndTypes from '../../../utils/dnd-types';
import styles from './ingredient-select-constructor.module.css'
import { IIngredientKey } from '../../../services/reducer-selector-directory/ingredients/ingredients-types';
import { useAppDispatch } from '../../../services/hooks';

interface IDragItem {
  id: string;
  index: number;
  type: string;
}

interface IIngredientSelectProps {
  ingredient: IIngredientKey;
  index: number;
  removeIngredient: () => void;
}

const IngredientSelect: FC<IIngredientSelectProps> = ({
  ingredient,
  index,
  removeIngredient,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { _id } = ingredient;

  const [{ handlerId }, drop] = useDrop<IDragItem, void, { handlerId: Identifier | null }>({
    accept: DndTypes.SortingIngredient,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }), 
    hover(item: IDragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;

      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
    type: DndTypes.SortingIngredient,
    item: { _id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${styles.item}${(isDragging && ` ${styles.itemDragging}`) || ''}`}
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



export default IngredientSelect;