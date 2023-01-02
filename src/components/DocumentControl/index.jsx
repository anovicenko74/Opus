import React from 'react';
import Paper from './Paper';
import Select from '@/components/UI/Select';
import Option from '@/components/UI/Select/Option';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
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
      <Input
        type="text"
        placeholder="Заголовок"
        value={currentDocument.title}
        onChange={(e) =>
          dispatch(setCurrentDocument({ title: e.target.value }))
        }
      />
      <div>
        <Paper />
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
