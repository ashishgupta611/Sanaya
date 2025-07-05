import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string; // Optional field
  firstName?: string; // Optional field
  lastName?: string; // Optional field
  address?: string; // Optional field for user's address
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string; // Optional field
  firstName?: string; // Optional field
  lastName?: string; // Optional field
  address?: string; // Optional field for user's address
  profilePictureUrl?: string; // Optional field for user's profile picture URL
  bio?: string; // Optional field for user's bio
  socialLinks?: {
    twitter?: string; // Optional field for Twitter link
    facebook?: string; // Optional field for Facebook link
    linkedin?: string; // Optional field for LinkedIn link
    instagram?: string; // Optional field for Instagram link
  };
  createdAt?: string; // Optional field for account creation date
  updatedAt?: string; // Optional field for last profile update date
  preferences?: {
    theme?: string; // Optional field for user's preferred theme
    language?: string; // Optional field for user's preferred language
  };
}

interface UserSettings {
  notificationsEnabled: boolean; // Whether notifications are enabled
  language?: string; // Optional field for user's preferred language
}

interface UserState {
  userProfile: UserProfile | null;
  userSettings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type UserRole = 'admin' | 'student' | 'guest' | 'teacher' | 'superadmin';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
