import React from 'react';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';

function DraggableSelect({ ...props }) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CATEGORY_SELECT,
  }));

  return (
    <div ref={drag}>
      <SelectWithNavigation {...props} />
    </div>
  );
}

export default DraggableSelect;
