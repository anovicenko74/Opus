import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from './CategoriesItem';

function CategoriesSelect({ category }) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [categoryDocuments, setCategoryDocuments] = useState([]);
  const documents = useSelector((state) => state.documents.documents);

  useEffect(() => {
    setCategoryDocuments(
      documents.filter((doc) => {
        console.log(doc, doc.categories);
        return doc.categories.includes(category);
      })
    );
  }, [documents]);

  const handleCategoryClick = () => {
    setIsSelectOpen((isSelectOpen) => !isSelectOpen);
  };

  return (
    <>
      {!isSelectOpen ? (
        <h2>{category}</h2>
      ) : (
        <>
          <h2 onClick={handleCategoryClick}>{category}</h2>
          {categoryDocuments.map((document) => (
            <CategoryItem document={document} />
          ))}
        </>
      )}
    </>
  );
}

export default CategoriesSelect;
