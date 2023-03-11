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
  const currentDocumentTitle = useSelector(
    (state) => state.documents.currentDocument.title
  );
  const currentDocumentDate = useSelector(
    (state) => state.documents.currentDocument.date
  );
  const errorMessage = useSelector((state) => state.documents.errorMessage);
  const dispatch = useDispatch();
  const currentDocumentIsExist = Boolean(currentDocumentDate);

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
    <div>
      <div className={style.header}>
        <div className={style.titleInput}>
          <Input
            type="text"
            placeholder="Заголовок"
            value={currentDocumentTitle}
            onChange={(e) =>
              dispatch(setCurrentDocument({ title: e.target.value }))
            }
          />
          {errorMessage ? errorMessage : ''}
        </div>
        {currentDocumentDate && (
          <div className={style.timer}>
            <span className={style.timerTitle}>Cохранено:</span>
            <span>
              <Timer initialTime={currentDocumentDate} />
            </span>
          </div>
        )}
      </div>
      <div>
        <div className={style.paper}>
          <Paper />
        </div>

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
