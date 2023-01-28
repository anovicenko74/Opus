import React from 'react';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';
import { useDispatch } from 'react-redux';
import { changeOrder } from '@/redux/slices/categoriesSlice';
import { changeCategory } from '@/redux/slices/documentsSlice';
import DropSelect from '../DropSelect';

function DragAndDropSelect({ setIsTrash, ...props }) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CATEGORY_SELECT,
    item: () => {
      setIsTrash(true);
      return { category: props.category }; // draggable category props
    },
    end: () => setIsTrash(false),
  }));

  return (
    <div ref={drag}>
      <DropSelect {...props} />
    </div>
  );
}

export default DragAndDropSelect;
