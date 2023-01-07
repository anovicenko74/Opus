import { configureStore, combineReducers } from '@reduxjs/toolkit';
import documentsReducer from './slices/documentsSlice';
import categoriesReducer from './slices/categoriesSlice';
import categoriesListener from './listeners/categoriesListener';
import { categoryCheckMiddleware } from '@/redux/middlewares/categoriesMiddlewares';
import { documentCheckMiddleware } from '@/redux/middlewares/documentsMiddlewares';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  documents: documentsReducer,
  categories: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(categoryCheckMiddleware, documentCheckMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
