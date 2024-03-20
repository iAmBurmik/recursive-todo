import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../components/types/types';
import {
  changeTodoDescription,
  changeTodoTitle,
  recursionCompleteToggler,
  recursionFilter,
  subTaskAdding,
} from '../components/utils/utils';
const { v4: uuidv4 } = require('uuid');

type TodosState = {
  list: ITodo[];
  status: string | null;
  error: string | null;
};

const initialState: TodosState = {
  list: localStorage.todos ? JSON.parse(localStorage.todos) : [],
  status: null,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ title: string; text?: string }>) {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.text || '',
        completed: false,
        subtasks: [],
      };
      state.list.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
    addSubTodo(
      state,
      action: PayloadAction<{ id: string; title: string; text?: string }>
    ) {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.text || '',
        completed: false,
        subtasks: [],
      };

      state.list = subTaskAdding(action.payload.id, state.list, newTodo);
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = recursionFilter(action.payload, state.list);
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
    changeComplete(state, action: PayloadAction<string>) {
      state.list = recursionCompleteToggler(action.payload, state.list);
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
    chandeTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      state.list = changeTodoTitle(
        action.payload.id,
        action.payload.title,
        state.list
      );
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
    chandeDescription(
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) {
      state.list = changeTodoDescription(
        action.payload.id,
        action.payload.description,
        state.list
      );
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
  },
});
export const {
  addTodo,
  addSubTodo,
  removeTodo,
  changeComplete,
  chandeTitle,
  chandeDescription,
} = todoSlice.actions;
export default todoSlice.reducer;
