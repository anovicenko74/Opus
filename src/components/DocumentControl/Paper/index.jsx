import React from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDocument } from '@/redux/slices/documentsSlice';

function Paper() {
  const currentDocumentText = useSelector(
    (state) => state.documents.currentDocument.text
  );
  const dispatch = useDispatch();
  return (
    <div className={style.paper}>
      <div className={style.paperContent}>
        <textarea
          onChange={(e) =>
            dispatch(setCurrentDocument({ text: e.target.value }))
          }
          value={currentDocumentText}
          className={style.textarea}
        ></textarea>
      </div>
    </div>
  );
}

export default Paper;
