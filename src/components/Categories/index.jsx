import React, { useEffect, useState } from 'react';
import CategoriesSelect from './CategoriesSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import { addCategory } from '@/redux/slices/categoriesSlice';

function Categories() {
  const [categoryName, setCategoryName] = useState('');
  const [documents, currentDocument, categories, errorMessage] = useSelector(
    (state) => [
      state.documents.documents,
      state.documents.currentDocument,
      state.categories.categories,
      state.categories.errorMessage,
    ]
  );
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
    dispatch(addCategory({ categoryName }));
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
      {errorMessage ? <div>{errorMessage}</div> : ''}
      {documents.map((doc) => (
        <h1 key={doc.id} onClick={(e) => handleSwitchDocument(e, doc)}>
          {[doc.id, doc.title]}
        </h1>
      ))}
    </>
  );
}

export default Categories;
