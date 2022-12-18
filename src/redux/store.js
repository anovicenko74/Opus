import { configureStore, combineReducers } from '@reduxjs/toolkit';
import documentsReducer from './documentsSlice';

const rootReducer = combineReducers({
  documents: documentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
