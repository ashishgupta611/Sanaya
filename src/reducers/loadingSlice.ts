import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingText: undefined,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<Omit<LoadingState, 'isLoading'>>) => {
      state.isLoading = true;
      state.loadingText = action.payload?.loadingText || 'Loading...';
    },
    stopLoading: (state) => {
      state.isLoading = false;
      state.loadingText = undefined;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;