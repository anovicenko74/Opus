import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const emptyDocument = {
  text: '',
  title: '',
  id: '',
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
        state.documents.push({
          ...state.currentDocument,
          ...action.payload,
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
        state.currentDocument.date = action.payload.date;
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
      state.currentDocument = emptyDocument;
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload.id
      );
      if (state.currentDocument.id == action.payload.id) {
        state.currentDocument = emptyDocument;
      }
    },
    documentError: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
    cleanCategory: (state, action) => {
      state.documents = state.documents.map((doc) => {
        if (doc.category !== action.payload.category) return doc;
        return { ...doc, category: '' };
      });
    },
    changeCategory: (state, action) => {
      state.documents.map((doc) => {
        if (doc.id == action.payload.id) {
          doc.category = action.payload.category;
        }
      });
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
  changeCategory,
} = documentsSlice.actions;
