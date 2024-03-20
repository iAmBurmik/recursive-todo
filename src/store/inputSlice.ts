import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TodosState = {
  title: string;
  description: string;
};

const initialState: TodosState = {
  title: '',
  description: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    addTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    addDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    clearFields(state, action: PayloadAction<void>) {
      state.title = '';
      state.description = '';
    },
  },
});
export const { addTitle, addDescription, clearFields } = inputSlice.actions;
export default inputSlice.reducer;
