const deleteCategoryMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'categories/deleteCategory') return next(action);

  return next(action);
};

export default deleteCategoryMiddleware;
