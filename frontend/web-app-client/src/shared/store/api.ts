import { authApi, accountsApi, creditsApi, operationsApi } from 'shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [creditsApi.reducerPath]: creditsApi.reducer,
  [operationsApi.reducerPath]: operationsApi.reducer,
}

export const apiMiddleware = [
  authApi.middleware,
  accountsApi.middleware,
  creditsApi.middleware,
  operationsApi.middleware,
]
