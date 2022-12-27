import React from 'react';
import Paper from './Paper';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDocument,
  createEmptyDocument,
  saveCurrentDocument,
  setCurrentDocument,
} from '@/redux/slices/documentsSlice';

function DocumentControl() {
  const [currentDocument, count, categories] = useSelector((state) => [
    state.documents.currentDocument,
    state.documents.count,
    state.categories.categories,
  ]);
  const dispatch = useDispatch();
  const currentDocumentIsExist = Boolean(currentDocument.id);

  const handleCreateEmptyDocument = (e) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
      dispatch(createEmptyDocument());
    } else {
      dispatch(createEmptyDocument());
    }
  };
  const handleSaveCurrentDocument = (e) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    } else {
      dispatch(addDocument());
    }
  };

  const handleClickCategory = (e, category) => {
    console.log('category', category);
    dispatch(setCurrentDocument({ category }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={currentDocument.title}
        onChange={(e) =>
          dispatch(setCurrentDocument({ title: e.target.value }))
        }
      />
      <h2>{currentDocument.id}</h2>
      <div>
        <Paper />
        <Select title="Категория">
          {categories.map((category) => (
            <Option
              key={category}
              value={category}
              onClick={(e) => handleClickCategory(e, category)}
            ></Option>
          ))}
        </Select>
        <button onClick={handleSaveCurrentDocument}>
          {currentDocumentIsExist ? 'Сохранить' : 'Добавить'}
        </button>
        <button onClick={handleCreateEmptyDocument}>
          {currentDocumentIsExist ? 'Создать новую запись' : 'Очистить'}
        </button>
      </div>
    </div>
  );
}

export default DocumentControl;
