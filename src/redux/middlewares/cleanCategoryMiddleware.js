let timerId;

const cleanCategoryMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'categories/deleteCategory') return next(action);

  store.dispatch({
    type: 'documents/cleanCategory',
    payload: {
      category: action.payload.category,
    },
  });
  return next(action);
};

export default cleanCategoryMiddleware;
