import style from './style.module.css';
import React, { useMemo } from 'react';
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
  const sortedDocuments = useMemo(
    () => documents.slice().sort((a, b) => b.date - a.date),
    [documents]
  );

  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  return (
    <>
      <Select title={'Все'}>
        {sortedDocuments.map((doc) => (
          <Option
            selected={doc.id === currentDocument.id}
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

      {categories.map((category) => {
        const categoryDocuments = sortedDocuments.filter((doc) => {
          return doc.category === category;
        });
        return (
          <Select
            title={category}
            key={category}
            count={categoryDocuments.length}
          >
            {categoryDocuments.map((doc) => (
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
        );
      })}
    </>
  );
}

export default CategoriesList;
