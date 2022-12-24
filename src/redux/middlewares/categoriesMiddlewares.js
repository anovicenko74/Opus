const categoryCheckUniqueMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'categories/addCategory') return next(action);
  const categoryName = String(action.payload.categoryName);
  const categories = store.getState().categories.categories;
  console.log('check', action);
  if (!categoryName) {
    const action = {
      type: 'categories/error',
      payload: {
        errorMessage: 'Невозможно объявить категорию с пустым названием',
      },
    };
    store.dispatch(action);
    return;
  }
  if (categories.includes(categoryName)) {
    const action = {
      type: 'categories/error',
      payload: {
        errorMessage: 'Такая категория уже существует',
      },
    };
    store.dispatch(action);
    return;
  }

  return next(action);
};

const categoryErrorMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'categories/error') return next(action);
  return next(action);
};

export { categoryCheckUniqueMiddleware, categoryErrorMiddleware };
