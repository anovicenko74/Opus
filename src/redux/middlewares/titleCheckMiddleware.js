let timerId;

const titleCheckMiddleware = (store) => (next) => (action) => {
  if (
    !(
      action.type === 'documents/addDocument' ||
      action.type === 'documents/saveCurrentDocument'
    )
  )
    return next(action);

  let isError = false;
  let errorAction = null;
  const documentTitle = store.getState().documents.currentDocument.title;
  const isOnlySpaceInDocumentTitle =
    documentTitle.split(' ').length - 1 === documentTitle.length;

  if (!documentTitle || isOnlySpaceInDocumentTitle) {
    isError = true;
    errorAction = {
      type: 'documents/documentError',
      payload: {
        errorMessage: 'Невозможно объявить документ с пустым названием',
      },
    };
  }

  if (isError) {
    store.dispatch(errorAction);
    clearTimeout(timerId);
    timerId = setTimeout(
      () =>
        store.dispatch({
          type: 'documents/documentError',
          payload: { errorMessage: '' },
        }),
      3000
    );
    return;
  }

  if (timerId) {
    store.dispatch({
      type: 'categories/documentError',
      payload: { errorMessage: '' },
    });
  }

  return next(action);
};

export default titleCheckMiddleware;
