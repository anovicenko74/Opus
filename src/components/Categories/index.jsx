import React, { useEffect, useState } from 'react';
import CategoriesSelect from './CategoriesSelect';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Item from '@/components/UI/Item';
import Popup from '@/components/UI/Popup';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCurrentDocument,
  switchCurrentDocument,
} from '@/redux/slices/documentsSlice';
import { addCategory } from '@/redux/slices/categoriesSlice';

function Categories() {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [documents, currentDocument, categories, errorMessage] = useSelector(
    (state) => [
      state.documents.documents,
      state.documents.currentDocument,
      state.categories.categories,
      state.categories.errorMessage,
    ]
  );
  const currentDocumentIsExist = Boolean(currentDocument.id);
  const handleSwitchDocument = (e, doc) => {
    if (currentDocumentIsExist) {
      dispatch(saveCurrentDocument());
    }
    dispatch(switchCurrentDocument({ id: doc.id }));
  };

  const handleAddCategory = (e) => {
    dispatch(addCategory({ categoryName }));
  };

  return (
    <>
      <Button
        onClick={() => setIsPopupOpen(true)}
        text={'Добавить категорию'}
      />

      <Popup
        title={'Добавить новую категорию'}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <div className={style.popupContentContainer}>
          <div className={style.popupInput}>
            <Input
              placeholder="Название категории"
              onChange={(e) => {
                setCategoryName(String(e.target.value));
              }}
            />
          </div>
          {errorMessage ? (
            <div className={style.popupErrorMessage}>{errorMessage}</div>
          ) : (
            ''
          )}
          <Button onClick={handleAddCategory} text={'Добавить'} />
        </div>
      </Popup>

      {categories.map((category) => (
        <CategoriesSelect key={category} category={category} />
      ))}

      {documents.map((doc) => (
        <Item
          text={doc.title}
          key={doc.id}
          onClick={(e) => handleSwitchDocument(e, doc)}
        />
      ))}
    </>
  );
}

export default Categories;
