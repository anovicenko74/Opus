import React, { useEffect, useState } from 'react';
import CategoriesList from './CategoriesList';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Popup from '@/components/UI/Popup';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '@/redux/slices/categoriesSlice';

function Categories() {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDocument, categories, errorMessage] = useSelector((state) => [
    state.documents.currentDocument,
    state.categories.categories,
    state.categories.errorMessage,
  ]);

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

      <CategoriesList></CategoriesList>
    </>
  );
}

export default Categories;
