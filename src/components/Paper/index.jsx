import React from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDocument } from '@/redux/documentsSlice';

function Paper(text) {
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );
  const dispatch = useDispatch();
  return (
    <div className={style.paper}>
      <div className={style.paperContent}>
        <textarea
          onChange={(e) =>
            dispatch(setCurrentDocument({ text: e.target.value }))
          }
          value={currentDocument.text}
          className={style.textarea}
        ></textarea>
      </div>
    </div>
  );
}

export default Paper;
