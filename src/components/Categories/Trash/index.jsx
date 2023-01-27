import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/dragConstants';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/redux/slices/categoriesSlice';

function Trash({ setRemovableCategory }) {
  const dispatch = useDispatch();
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CATEGORY_SELECT,
    drop: (item) => setRemovableCategory(item.category),
  }));

  return <FontAwesomeIcon ref={drop} icon={faTrash} />;
}

export default Trash;
