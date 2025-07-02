export type UserRole = 'admin' | 'student' | 'guest' | 'teacher' | 'superadmin';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface UserPreferences {
  theme?: string;
  language?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  address?: string; // Consider using Address if detailed structure is needed
}

export interface UserProfile extends User {
  profilePictureUrl?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
  preferences?: UserPreferences;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  language?: string;
}

export interface UserState {
  userProfile: UserProfile | null;
  userSettings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

