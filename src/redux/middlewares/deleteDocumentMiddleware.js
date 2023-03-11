const deleteDocumentMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'documents/deleteDocument') return next(action);

  const currentDocument = store.getState().documents.currentDocument;
  if (currentDocument.id === action.payload.id)
    store.dispatch({
      type: 'documents/createEmptyDocument',
    });

  return next(action);
};

export default deleteDocumentMiddleware;
