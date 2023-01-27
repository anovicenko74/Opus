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
      const categories = state.categories.slice();
      const { firstCategory, secondCategory } = action.payload;
      const firstCategoryIndex = categories.indexOf(firstCategory);
      const secondCategoryIndex = categories.indexOf(secondCategory);
      categories[firstCategoryIndex] = secondCategory;
      categories[secondCategoryIndex] = firstCategory;
      state.categories = categories;
    },
    deleteCategory: (state, action) => {
      const category = action.payload.category;
      const categoryIndex = state.categories.indexOf(category);
      state.categories.splice(categoryIndex, 1);
    },
    error: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export default categorySlice.reducer;

export const { addCategory, changeOrder, deleteCategory } =
  categorySlice.actions;
