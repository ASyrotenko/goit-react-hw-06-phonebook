import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';

const initialContacts = [
  {
    id: '1',
    name: 'Contact 1',
    number: '555-22-33',
  },
  {
    id: '2',
    name: 'Contact 2',
    number: '555-22-33',
  },
  {
    id: '3',
    name: 'Contact 3',
    number: '555-22-33',
  },
];

export const contactsSlicer = createSlice({
  name: 'contacts',
  initialState: [...initialContacts],
  reducers: {
    addContactRedux(state, action) {
      const contact = {
        id: shortid.generate(),
        name: action.payload.name,
        number: action.payload.number,
      };
      const normalizedName = action.payload.name.toLowerCase();
      const findeName = state.some(contact =>
        contact.name.toLowerCase().includes(normalizedName)
      );
      if (findeName) {
        return alert(`${action.payload.name} is already in contacts.`);
      }
      return [...state, contact];
    },
    deleteContactRedux(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContactRedux, deleteContactRedux } = contactsSlicer.actions;
