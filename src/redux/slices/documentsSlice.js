import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const emptyDocument = {
  text: '',
  title: '',
  id: '',
  category: '',
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    count: 0,
    documents: [],
    currentDocument: {
      ...emptyDocument,
    },
  },
  reducers: {
    addDocument: {
      reducer: (state, action) => {
        state.count++;
        state.documents.push({
          ...state.currentDocument,
          id: action.payload.id,
        });
        state.currentDocument = { ...emptyDocument };
      },
      prepare: (payload) => {
        return {
          payload: { ...payload, id: uniqid() },
        };
      },
    },
    saveCurrentDocument: (state) => {
      const stateDocuments = state.documents.slice();
      const indexOfCurrentDocument = stateDocuments.findIndex(
        (doc) => doc.id === state.currentDocument.id
      );
      stateDocuments[indexOfCurrentDocument] = state.currentDocument;
      state.documents = stateDocuments; // save currentDocument in state.documents
    },
    switchCurrentDocument: (state, action) => {
      const documentWithPayloadId = state.documents.find(
        (doc) => doc.id == action.payload.id
      );
      state.currentDocument = documentWithPayloadId; // changeDocument in documents
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = { ...state.currentDocument, ...action.payload };
    },

    createEmptyDocument: (state) => {
      state.currentDocument = { ...emptyDocument };
    },
    deleteDocument: (state, action) => {
      state.count--;
      state.documents.filter((doc) => doc.id !== action.payload.id);
    },
  },
});
export default documentsSlice.reducer;

export const {
  addDocument,
  deleteDocument,
  setCurrentDocument,
  switchCurrentDocument,
  createEmptyDocument,
  saveCurrentDocument,
} = documentsSlice.actions;
