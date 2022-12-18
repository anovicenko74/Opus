import style from './App.module.css';
import Paper from './components/Paper';
import Categories from './components/Categories';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDocument,
  createEmptyDocument,
  saveCurrentDocument,
} from '@/redux/documentsSlice';

function App() {
  const [currentDocument, count] = useSelector((state) => [
    state.documents.currentDocument,
    state.documents.count,
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

  return (
    <div className={style.wrapper}>
      <section>
        <input
          type="text"
          value={currentDocument.title}
          onChange={(e) =>
            dispatch(setCurrentDocument({ title: e.target.value }))
          }
        />
        <h2>{currentDocument.id}</h2>
        <div className={style.container}>
          <h1>{count}</h1>
          <Paper />
          <button onClick={handleSaveCurrentDocument}>
            {currentDocumentIsExist ? 'Сохранить' : 'Добавить'}
          </button>
          <button onClick={handleCreateEmptyDocument}>
            {currentDocumentIsExist ? 'Создать новую запись' : 'Очистить'}
          </button>
        </div>
      </section>
      <Categories />
    </div>
  );
}

export default App;
