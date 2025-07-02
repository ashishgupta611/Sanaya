import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
//import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "@/src/features/auth/authSlice";
import userReducer from "@/src/features/user/userSlice";
// import appStateReducer from '../features/appState/appStateSlice';
// import courseReducer from '../features/course/courseSlice';
// import quizReducer from '../features/quiz/quizSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // appState: appStateReducer,
    // course: courseReducer,
    // quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for use throughout your app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
