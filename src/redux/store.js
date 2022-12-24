import { configureStore, combineReducers } from '@reduxjs/toolkit';
import documentsReducer from './slices/documentsSlice';
import categoriesReducer from './slices/categoriesSlice';
import categoriesListener from './listeners/categoriesListener';
import {
  categoryCheckUniqueMiddleware,
  categoryErrorMiddleware,
} from '@/redux/middlewares/categoriesMiddlewares';
const rootReducer = combineReducers({
  documents: documentsReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      categoryCheckUniqueMiddleware,
      categoryErrorMiddleware
    ),
});

export default store;
