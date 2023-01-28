import React from 'react';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';
import { useDispatch } from 'react-redux';
import { changeOrder } from '@/redux/slices/categoriesSlice';
import { changeCategory } from '@/redux/slices/documentsSlice';

function DraggableSelect({ setIsTrash, ...props }) {
  const dispatch = useDispatch();
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CATEGORY_SELECT,
    item: () => {
      setIsTrash(true);
      return { category: props.category }; // draggable category props
    },
    end: () => setIsTrash(false),
  }));
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.CATEGORY_SELECT, ItemTypes.DOCUMENT_SELECT],
    drop: (item) => {
      if (item.category) {
        dispatch(
          changeOrder({
            firstCategory: props.category, // target category props
            secondCategory: item.category,
          })
        );
      } else if (item.id) {
        dispatch(changeCategory({ id: item.id, category: props.category }));
      }
    },
  }));

  return (
    <div ref={drop}>
      <div ref={drag}>
        <SelectWithNavigation {...props} />
      </div>
    </div>
  );
}

export default DraggableSelect;
