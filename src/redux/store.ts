import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PERSIST,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '@/services';

import rootReducer, { RootReducerType } from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [api.reducerPath]
};

const persistedReducer = persistReducer<RootReducerType>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PERSIST, PAUSE, PURGE, REGISTER, REHYDRATE]
      }
    }).concat(api.middleware)
});

export const persistor = persistStore(store);

export function mergeStore() {
  return { store, persistor };
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
