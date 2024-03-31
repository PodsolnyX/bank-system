import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from 'features/auth'
import { apiMiddleware, apiReducers } from './api'

export const store = configureStore({
  reducer: combineReducers({
    ...apiReducers,
    authReducer,
  }),
  middleware: (gDM) => gDM().concat(apiMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
