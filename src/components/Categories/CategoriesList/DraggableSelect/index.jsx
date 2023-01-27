import React from 'react';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';
import { useDispatch } from 'react-redux';
import { changeOrder } from '@/redux/slices/categoriesSlice';

function DraggableSelect({ setIsTrash, ...props }) {
  const dispatch = useDispatch();
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CATEGORY_SELECT,
    item: () => {
      setIsTrash(true);
      return { category: props.title }; // draggable category props
    },
    end: () => setIsTrash(false),
  }));
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CATEGORY_SELECT,
    drop: (item) => {
      dispatch(
        changeOrder({
          firstCategory: props.title, // target category props
          secondCategory: item.category,
        })
      );
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
