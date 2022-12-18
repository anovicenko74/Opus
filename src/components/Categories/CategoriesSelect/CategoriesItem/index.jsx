import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/documentsSlice';
function CategoryItem({ document }) {
  const dispatch = useDispatch();
  
  const handleItemClick = (e, id) => {
    dispatch(saveCurrentDocument());
    dispatch(switchCurrentDocument(id));
  };

  return (
    <div onClick={(e) => handleItemClick(e, document.id)}>{document.title}</div>
  );
}

export default CategoryItem;
