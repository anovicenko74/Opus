import React, { useEffect, useState } from 'react';
import CategoriesList from './CategoriesList';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Popup from '@/components/UI/Popup';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '@/redux/slices/categoriesSlice';
import Trash from './Trash';
import { deleteCategory } from '../../redux/slices/categoriesSlice';

const selector = (state) => state.categories.errorMessage;

function Categories() {
  const [isTrash, setIsTrash] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isAddPopup, setIsAddPopup] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector(selector);

  const handleAddCategory = (e) => {
    dispatch(addCategory({ categoryName }));
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.categoryButton}>
          <Button
            onClick={() => setIsAddPopup(true)}
            text={'Добавить категорию'}
          />
        </div>
        <div className={style.trash}>
          <Trash isTrash={isTrash} setIsTrash={setIsTrash} />
        </div>
      </div>
      <Popup
        title={'Добавить новую категорию'}
        isOpen={isAddPopup}
        onClose={() => setIsAddPopup(false)}
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

      <CategoriesList setIsTrash={setIsTrash} />
    </>
  );
}

export default Categories;
