import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    errorMessage: null,
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(String(action.payload.categoryName));
    },
    changeOrder: (state, action) => {
      
    },
    error: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export default categorySlice.reducer;

export const { addCategory } = categorySlice.actions;
