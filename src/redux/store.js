import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer, apiMiddleware } from './Auth/authSlice'
import jobReducer from './Job/jobSlice'
import chatReducer from './Chat/chatSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    apiMiddleware,
  })

export const store = configureStore({
  reducer: {
    job: jobReducer,
    chat: chatReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware,
})

export const persistor = persistStore(store)
