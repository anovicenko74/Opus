let timerId;

const categoryCheckMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'categories/addCategory') return next(action);

  let isError = false;
  let errorAction = null;
  const categoryName = String(action.payload.categoryName);
  const categories = store.getState().categories.categories;
  const isOnlySpaceInCategoryName =
    categoryName.split(' ').length - 1 === categoryName.length;

  if (!categoryName || isOnlySpaceInCategoryName) {
    isError = true;
    errorAction = {
      type: 'categories/error',
      payload: {
        errorMessage: 'Невозможно объявить категорию с пустым названием',
      },
    };
  }
  if (categories.includes(categoryName)) {
    isError = true;
    errorAction = {
      type: 'categories/error',
      payload: {
        errorMessage: 'Такая категория уже существует',
      },
    };
  }

  if (isError) {
    store.dispatch(errorAction);
    clearTimeout(timerId);
    timerId = setTimeout(
      () =>
        store.dispatch({
          type: 'categories/error',
          payload: { errorMessage: '' },
        }),
      3000
    );
    return;
  }

  if (timerId) {
    store.dispatch({
      type: 'categories/error',
      payload: { errorMessage: '' },
    });
  }

  return next(action);
};

export default categoryCheckMiddleware;
