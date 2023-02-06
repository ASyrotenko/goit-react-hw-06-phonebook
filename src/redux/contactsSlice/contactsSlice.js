import { createSlice } from '@reduxjs/toolkit';

export const contactsSlicer = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContactRedux(state, action) {
      return [...state, action.payload];
    },
    deleteContactRedux(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContactRedux, deleteContactRedux } = contactsSlicer.actions;
