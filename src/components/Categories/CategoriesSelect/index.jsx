import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';

function CategoriesSelect({ category }) {
  const dispatch = useDispatch();
  const [categoryDocuments, setCategoryDocuments] = useState([]);
  const [currentDocument, documents] = useSelector((state) => [
    state.documents.currentDocument,
    state.documents.documents,
  ]);
  const currentDocumentIsExist = Boolean(currentDocument.id);

  useEffect(() => {
    setCategoryDocuments(
      documents.filter((doc) => {
        return doc.category === category;
      })
    );
    console.log('documents', categoryDocuments, documents, category);
  }, [documents]);

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  return (
    <Select title={category}>
      {categoryDocuments.map((doc) => (
        <Option
          key={doc.id}
          onClick={(e) => {
            handleSwitchDocument(e, doc);
          }}
          value={doc.title}
        />
      ))}
    </Select>
  );
}

export default CategoriesSelect;
