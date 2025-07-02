import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UserSettings, UserState } from '@/src/types/user';

const initialState: UserState = {
  userProfile: null,
  userSettings: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
      state.loading = false;
    },
    fetchUserProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSettings(state, action: PayloadAction<UserSettings>) {
      state.userSettings = action.payload;
    },
    clearUserData(state) {
      state.userProfile = null;
      state.userSettings = null;
    },
  },
});

export const {
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  updateUserSettings,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
