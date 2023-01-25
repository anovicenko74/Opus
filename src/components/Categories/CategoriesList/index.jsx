import style from './style.module.css';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';

const renderCategorySelect = ({
  title,
  documents,
  key,
  checkSelected,
  handleSwitchDocument,
}) => {
  const count = documents.length;

  return (
    <Select title={title} key={key} count={count}>
      {documents.map((doc) => (
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
      ))}
    </Select>
  );
};

function CategoriesList() {
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

  return (
    <>
      {renderCategorySelect({
        title: 'Все',
        documents: sortedDocuments,
        checkSelected,
        handleSwitchDocument,
      })}

      {categories.map((category) => {
        const categoryDocuments = sortedDocuments.filter((doc) => {
          return doc.category === category;
        });

        return renderCategorySelect({
          title: category,
          key: category,
          documents: categoryDocuments,
          checkSelected,
          handleSwitchDocument,
        });
      })}
    </>
  );
}

export default CategoriesList;
