import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DragTypes from '@/DragTypes';
import { useDispatch } from 'react-redux';
import { changeOrder } from '@/redux/slices/categoriesSlice';
import { changeCategory } from '@/redux/slices/documentsSlice';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';

function DropSelect({ ...props }) {
  const dispatch = useDispatch();
  const [, drop] = useDrop(() => ({
    accept: [
      props.category ? DragTypes.CATEGORY_SELECT : '',
      DragTypes.DOCUMENT_SELECT,
    ],
    drop: (item) => {
      switch (item.type) {
        case DragTypes.CATEGORY_SELECT:
          dispatch(
            changeOrder({
              firstCategory: props.category, // target category props
              secondCategory: item.payload.category,
            })
          );
          break;
        case DragTypes.DOCUMENT_SELECT:
          dispatch(
            changeCategory({
              id: item.payload.document.id,
              category: props.category,
            })
          );
          break;
      }
    },
  }));

  return (
    <div ref={drop}>
      <SelectWithNavigation {...props} />
    </div>
  );
}

export default DropSelect;
