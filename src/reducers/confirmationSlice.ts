import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmationDialog } from '@/src/types/interfaces';

const initialState: ConfirmationDialog = {
  isOpen: false,
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  // onConfirm: () => {},
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

export const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    openConfirmation: (state, action: PayloadAction<Omit<ConfirmationDialog, 'isOpen'>>) => {
      return {
        ...state,
        isOpen: true,
        ...action.payload,
      };
    },
    closeConfirmation: (state) => {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
});

export const { openConfirmation, closeConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;