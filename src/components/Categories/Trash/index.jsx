import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Popup from '@/components/UI/Popup';
import Button from '@/components/UI/Button';
import { useDrop } from 'react-dnd';
import DragTypes from '@/DragTypes';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/redux/slices/categoriesSlice';
import { deleteDocument } from '@/redux/slices/documentsSlice';

function Trash({ isTrash }) {
  const dispatch = useDispatch();
  const [deleteControl, setdeleteControl] = useState({
    title: '',
    handleDelete: () => {},
  });
  const [isPopup, setIsPopup] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: [DragTypes.CATEGORY_SELECT, DragTypes.DOCUMENT_SELECT],
    drop: (item) => {
      switch (item.type) {
        case DragTypes.CATEGORY_SELECT:
          setdeleteControl({
            handleDelete: () => {
              dispatch(deleteCategory({ category: item.payload.category }));
            },
            title: item.payload.category,
          });
          break;
        case DragTypes.DOCUMENT_SELECT:
          setdeleteControl({
            handleDelete: () => {
              dispatch(deleteDocument({ id: item.payload.document.id }));
            },
            title: item.payload.document.title,
          });
          break;
      }
      setIsPopup(true);
    },
  }));

  return (
    <>
      {isTrash && <FontAwesomeIcon ref={drop} icon={faTrash} />}

      <Popup
        title={`Уверены, что хотите удалить ${deleteControl.title}?`}
        isOpen={isPopup}
        onClose={() => setIsPopup(false)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0 0 0',
          }}
        >
          <Button
            text={'Конечно'}
            onClick={() => {
              deleteControl.handleDelete();
              setIsPopup(false);
            }}
          />
          <div
            style={{
              width: '10px',
            }}
          ></div>
          <Button
            text={'Не уверен...'}
            onClick={() => {
              setIsPopup(false);
            }}
          />
        </div>
      </Popup>
    </>
  );
}

export default Trash;
