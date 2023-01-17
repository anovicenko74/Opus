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
    documents: [],
    currentDocument: {
      ...emptyDocument,
    },
    errorMessage: '',
  },
  reducers: {
    addDocument: {
      reducer: (state, action) => {
        state.count++;
        state.documents.push({
          ...state.currentDocument,
          id: action.payload.id,
          date: action.payload.date,
        });
        state.currentDocument = { ...emptyDocument };
      },
      prepare: (payload) => {
        return {
          payload: { ...payload, id: uniqid(), date: Date.now() },
        };
      },
    },
    saveCurrentDocument: {
      // save currentDocument in state.documents
      reducer: (state, action) => {
        const stateDocuments = state.documents.slice();
        const indexOfCurrentDocument = stateDocuments.findIndex(
          (doc) => doc.id === state.currentDocument.id
        );
        stateDocuments[indexOfCurrentDocument] = {
          ...state.currentDocument,
          ...action.payload,
        };
        state.documents = stateDocuments;

        state.currentDocument = action.payload.date; // save time synchronization :(
      },
      prepare: (payload) => {
        return {
          payload: { ...payload, date: Date.now() },
        };
      },
    },

    switchCurrentDocument: (state, action) => {
      const documentWithPayloadId = state.documents.find(
        (doc) => doc.id == action.payload.id
      );
      state.currentDocument = documentWithPayloadId;
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
    documentError: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
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
  documentError,
} = documentsSlice.actions;
