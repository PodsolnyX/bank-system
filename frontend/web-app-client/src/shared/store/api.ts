import { authApi } from 'shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
}

export const apiMiddleware = [authApi.middleware]
