import React, { useEffect, useState } from 'react';
import Paper from './Paper';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Timer from '@/components/DocumentControl/Timer';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDocument,
  createEmptyDocument,
  saveCurrentDocument,
  setCurrentDocument,
} from '@/redux/slices/documentsSlice';

function DocumentControl() {
  const [currentDocument, errorMessage, categories] = useSelector((state) => [
    state.documents.currentDocument,
    state.documents.errorMessage,
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
    if (category === currentDocument.category) {
      dispatch(setCurrentDocument({ category: '' }));
    } else {
      dispatch(setCurrentDocument({ category }));
    }
  };
  return (
    <div>
      <div className={style.header}>
        <div className={style.titleInput}>
          <Input
            type="text"
            placeholder="Заголовок"
            value={currentDocument.title}
            onChange={(e) =>
              dispatch(setCurrentDocument({ title: e.target.value }))
            }
          />
          {errorMessage ? errorMessage : ''}
        </div>
        {currentDocument.date && (
          <div className={style.timer}>
            <span className={style.timerTitle}>Cохранено:</span>
            <span>
              <Timer initialTime={currentDocument.date} />
            </span>
          </div>
        )}
      </div>
      <div>
        <div className={style.paper}>
          <Paper />
        </div>
        <Select title="Категория">
          {categories.map((category) => (
            <Option
              selected={category === currentDocument.category}
              key={category}
              text={category}
              onClick={(e) => handleClickCategory(e, category)}
            ></Option>
          ))}
        </Select>
        <Button
          onClick={handleSaveCurrentDocument}
          text={currentDocumentIsExist ? 'Сохранить' : 'Добавить'}
        />
        <Button
          onClick={handleCreateEmptyDocument}
          text={currentDocumentIsExist ? 'Создать новую запись' : 'Очистить'}
        />
      </div>
    </div>
  );
}

export default DocumentControl;
