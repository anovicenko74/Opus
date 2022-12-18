import React, { useEffect, useState } from 'react';
import CategoriesSelect from './CategoriesSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
  addCategory,
} from '@/redux/documentsSlice';

function Categories() {
  const [categoryName, setCategoryName] = useState('');
  const [documents, currentDocument, categories] = useSelector((state) => [
    state.documents.documents,
    state.documents.currentDocument,
    state.documents.categories,
  ]);
  const dispatch = useDispatch();
  const currentDocumentIsExist = Boolean(currentDocument.id);

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument(currentDocument.id));
      dispatch(switchCurrentDocument(doc.id));
    } else {
      dispatch(switchCurrentDocument(doc.id));
    }
  };

  const handleAddCategory = (e) => {
    dispatch(addCategory(categoryName));
  };

  return (
    <>
      <input
        placeholder="category name"
        onChange={(e) => {
          setCategoryName(String(e.target.value));
        }}
      />
      <button onClick={handleAddCategory}>Add category</button>
      {categories.map((category) => (
        <CategoriesSelect key={category} category={category} />
      ))}
      {documents.map((doc) => (
        <h1 key={doc.id} onClick={(e) => handleSwitchDocument(e, doc)}>
          {[doc.id, doc.title]}
        </h1>
      ))}
    </>
  );
}

export default Categories;
