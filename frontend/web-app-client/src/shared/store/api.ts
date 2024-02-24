import { authApi, accountsApi, loansApi, operationsApi, userApi } from 'shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [loansApi.reducerPath]: loansApi.reducer,
  [operationsApi.reducerPath]: operationsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
}

export const apiMiddleware = [
  authApi.middleware,
  accountsApi.middleware,
  loansApi.middleware,
  operationsApi.middleware,
  userApi.middleware,
]
