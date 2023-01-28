import style from './style.module.css';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import SelectWithNavigation from '@/components/UI/Select/SelectWithNavigation';
import DragSelect from './DragSelect';
import DraggableOption from './DragOption';
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

  const renderDragSelect = ({ title, category, documents, key }) => {
    const count = documents.length;
    return (
      <DragSelect
        title={title}
        category={category}
        key={key}
        count={count}
        setIsTrash={setIsTrash}
      >
        {documents.map((doc) => renderDraggableOption(doc))}
      </DragSelect>
    );
  };

  const renderDraggableOption = (doc) => (
    <DraggableOption
      selected={checkSelected(doc)}
      key={doc.id}
      onClick={(e) => {
        handleSwitchDocument(e, doc);
      }}
      id={doc.id}
      text={doc.title}
    >
      <div className={style.documentCategory}>{doc.category}</div>
    </DraggableOption>
  );

  return (
    <>
      {renderDragSelect({
        title: 'Все',
        category: null,
        documents: sortedDocuments,
      })}
      <hr className={style.hr} />

      {categories.map((category) => {
        const categoryDocuments = sortedDocuments.filter((doc) => {
          return doc.category === category;
        });

        return renderDragSelect({
          title: category,
          category: category,
          key: category,
          documents: categoryDocuments,
        });
      })}
      <div>Drag'n'Drop it!</div>
    </>
  );
}

export default CategoriesList;
