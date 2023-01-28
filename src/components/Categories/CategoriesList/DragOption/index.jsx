import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import Option from '@/components/UI/Select/Option';
import { ItemTypes } from '@/dragConstants';

function DraggableOption({ id, ...props }) {
  const dispatch = useDispatch();
  const [, drag] = useDrag(() => ({
    type: ItemTypes.DOCUMENT_SELECT,
    item: () => {
      return { id: id }; // draggable category props
    },
  }));

  return (
    <div ref={drag}>
      <Option {...props} />
    </div>
  );
}

export default DraggableOption;
