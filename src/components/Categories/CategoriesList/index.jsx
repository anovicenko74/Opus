import style from './style.module.css';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import DraggableSelect from './DraggableSelect';
import Option from '@/components/UI/Select/Option';
import Trash from '../Trash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';

function CategoriesList({ setIsTrash }) {
  const dispatch = useDispatch();
  const [categories, currentDocument, documents] = useSelector((state) => [
    state.categories.categories,
    state.documents.currentDocument,
    state.documents.documents,
  ]);
  const currentDocumentIsExist = Boolean(currentDocument.id);
  const sortedDocuments = useMemo(
    () => documents.slice().sort((a, b) => b.date - a.date),
    [documents]
  );

  const checkSelected = (doc) => {
    return doc.id === currentDocument.id;
  };

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  const renderDraggableSelect = ({ title, documents, key }) => {
    const count = documents.length;
    return (
      <DraggableSelect
        title={title}
        key={key}
        count={count}
        setIsTrash={setIsTrash}
      >
        {documents.map((doc) => renderOption(doc))}
      </DraggableSelect>
    );
  };

  const renderOption = (doc) => (
    <Option
      selected={checkSelected(doc)}
      key={doc.id}
      onClick={(e) => {
        handleSwitchDocument(e, doc);
      }}
      text={doc.title}
    >
      <div className={style.documentCategory}>{doc.category}</div>
    </Option>
  );

  return (
    <>
      <SelectWithNavigation title="Все">
        {sortedDocuments.map((doc) => renderOption(doc))}
      </SelectWithNavigation>

      <hr className={style.hr} />

      {categories.map((category) => {
        const categoryDocuments = sortedDocuments.filter((doc) => {
          return doc.category === category;
        });

        return renderDraggableSelect({
          title: category,
          key: category,
          documents: categoryDocuments,
        });
      })}
      <div>Drag'n'Drop it!</div>
    </>
  );
}

export default CategoriesList;
