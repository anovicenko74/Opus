import style from './style.module.css';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import DragAndDropSelect from './DragAndDropSelect';
import DropSelect from './DropSelect';
import DragOption from './DragOption';

const selectSortedDocuments = createSelector(
  (state) => state.documents.documents,
  (documents) => documents.slice().sort((a, b) => b.date - a.date)
);

function CategoriesList({ setIsTrash }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const sortedDocuments = useSelector(selectSortedDocuments);
  const currentDocumentId = useSelector(
    (state) => state.documents.currentDocument.id
  );
  const currentDocumentIsExist = Boolean(currentDocumentId);

  // const sortedDocuments = useMemo(() => {
  //   return documents.slice().sort((a, b) => b.date - a.date);
  // }, [documents]);
  // - now its createSelector

  const checkSelected = (doc) => {
    return doc.id === currentDocumentId;
  };

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  const renderDropSelect = () => {
    return (
      <DropSelect title="Все" category="" count={sortedDocuments.length}>
        {sortedDocuments.map((doc) => renderDragOption(doc))}
      </DropSelect>
    );
  };

  const renderDragAndDropSelect = ({ title, category, documents, key }) => {
    const count = documents.length;
    return (
      <DragAndDropSelect
        title={title}
        category={category}
        key={key}
        count={count}
        setIsTrash={setIsTrash}
        onDragStart={() => {
          setIsTrash(true);
        }}
        onDragEnd={() => {
          setIsTrash(false);
        }}
        item={{ category: category }}
      >
        {documents.map((doc) => renderDragOption(doc))}
      </DragAndDropSelect>
    );
  };

  const renderDragOption = (doc) => (
    <DragOption
      selected={checkSelected(doc)}
      key={doc.id}
      onClick={(e) => {
        handleSwitchDocument(e, doc);
      }}
      id={doc.id}
      text={doc.title}
      onDragStart={() => {
        setIsTrash(true);
      }}
      onDragEnd={() => {
        setIsTrash(false);
      }}
      item={{ document: doc }}
    >
      <div className={style.documentCategory}>{doc.category}</div>
    </DragOption>
  );

  return (
    <>
      {renderDropSelect()}
      <hr className={style.hr} />
      {categories.map((category) => {
        const categoryDocuments = sortedDocuments.filter((doc) => {
          return doc.category === category;
        });

        return renderDragAndDropSelect({
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
