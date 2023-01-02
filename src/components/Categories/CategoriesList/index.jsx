import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';

function CategoriesList() {
  const dispatch = useDispatch();
  const [categories, currentDocument, documents] = useSelector((state) => [
    state.categories.categories,
    state.documents.currentDocument,
    state.documents.documents,
  ]);
  const currentDocumentIsExist = Boolean(currentDocument.id);

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  return (
    <>
      <Select title={'Все'}>
        {documents.map((doc) => (
          <Option
            selected={doc.id === currentDocument.id}
            key={doc.id}
            onClick={(e) => {
              handleSwitchDocument(e, doc);
            }}
            text={doc.title}
          />
        ))}
      </Select>

      {categories.map((category) => {
        const categoryDocuments = documents.filter((doc) => {
          return doc.category === category;
        });
        return (
          <Select title={category} key={category}>
            {categoryDocuments.map((doc) => (
              <Option
                selected={doc.id === currentDocument.id}
                key={doc.id}
                onClick={(e) => {
                  handleSwitchDocument(e, doc);
                }}
                text={doc.title}
              ></Option>
            ))}
          </Select>
        );
      })}
    </>
  );
}

export default CategoriesList;
