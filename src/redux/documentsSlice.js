import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    count: 0,
    categories: [],
    documents: [],
    currentDocument: {
      text: '',
      title: '',
      id: '',
      categories: [],
    },
  },
  reducers: {
    saveCurrentDocument: (state) => {
      const documents = state.documents.slice();
      const indexOfCurrentDocument = documents.findIndex(
        (doc) => doc.id === state.currentDocument.id
      );
      documents[indexOfCurrentDocument] = state.currentDocument;
      state.documents = documents; // save currentDocument in state.documents
    },
    switchCurrentDocument: (state, action) => {
      const id = action.payload;
      const documentWithPayloadId = state.documents.find((doc) => doc.id == id);
      state.currentDocument = documentWithPayloadId; // changeDocument in documents
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = { ...state.currentDocument, ...action.payload };
    },
    addDocument: (state) => {
      const emptyDocument = { title: '', text: '', id: '' };
      const newDocument = { ...state.currentDocument, id: uniqid() };
      state.count++;
      state.currentDocument = emptyDocument;
      state.documents.push(newDocument);
    },
    createEmptyDocument: (state) => {
      const emptyDocument = { title: '', text: '', id: '' };
      state.currentDocument = emptyDocument;
    },
    deleteDocument: (state, action) => {
      const id = action.payload;
      state.count--;
      state.documents.filter((doc) => doc.id !== id);
    },
    addCategory: (state, action) => {
      const categoryName = String(action.payload);
      const categoriesArray = state.categories.splice(0);

      if (categoryName && !categoriesArray.includes(categoryName)) {
        categoriesArray.push(categoryName);
        state.categories = categoriesArray;
      } else {
        state.categories = categoriesArray;
      }
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
  addCategory,
} = documentsSlice.actions;
