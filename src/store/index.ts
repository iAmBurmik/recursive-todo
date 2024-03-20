import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import inputReducer from './inputSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    input: inputReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
