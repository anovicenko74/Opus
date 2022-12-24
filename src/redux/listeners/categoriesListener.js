import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addCategory } from '../slices/categoriesSlice';

const categoriesListener = createListenerMiddleware();

categoriesListener.startListening({
  actionCreator: addCategory,
  effect: (action, listenerApi) => {
    console.log(action, listenerApi.getState());
  },
});

export default categoriesListener.middleware;

// Срабатывает после обновления стэйта. Можено использовать в будущем