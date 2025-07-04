import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "@/src/features/auth/authSlice";
import userReducer from "@/src/features/user/userSlice";
import loadingReducer from '@/src/reducers/loadingSlice';
import messageReducer from '@/src/reducers/messageSlice';
import confirmationreducer from '../reducers/confirmationSlice';
// import appStateReducer from '../features/appState/appStateSlice';
// import courseReducer from '../features/course/courseSlice';
// import quizReducer from '../features/quiz/quizSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    loading: loadingReducer,
    message: messageReducer,
    confirmation: confirmationreducer
    // appState: appStateReducer,
    // course: courseReducer,
    // quiz: quizReducer,
});

export type ReducerState = ReturnType<typeof rootReducer>;

const isClient = typeof window !== 'undefined';

const persistConfig: PersistConfig<ReducerState> = {
    key: 'root',
    storage: isClient ? storage : require('redux-persist/lib/storage/session').default,
    whitelist: ['auth', 'user', 'loading', 'message', 'confirmation'] 
    //whitelist: ['tasks'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;