import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';
import { useDispatch } from 'react-redux';
import { changeOrder } from '@/redux/slices/categoriesSlice';
import { changeCategory } from '@/redux/slices/documentsSlice';

function DropSelect({ setIsTrash, Select, ...props }) {
  const dispatch = useDispatch();
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

  return <div ref={drop}><Select {...props, setIsTrash}/></div>;
}

export default DropSelect;
