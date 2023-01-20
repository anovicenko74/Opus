import isEqual from '../../utils/isEqual';

const abortSaveMiddleware = (store) => (next) => (action) => {
  if (action.type !== 'documents/saveCurrentDocument') return next(action);

  const currentDocument = store.getState().documents.currentDocument;
  const savedDocument = store
    .getState()
    .documents.documents.find((doc) => doc.id == currentDocument.id);
    
  if (isEqual(currentDocument, savedDocument)) {
    return;
  }

  return next(action);
};

export default abortSaveMiddleware;
