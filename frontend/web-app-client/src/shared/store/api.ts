import { accountsApi, loansApi, operationsApi, userApi } from 'shared/api'

export const apiReducers = {
  [accountsApi.reducerPath]: accountsApi.reducer,
  [loansApi.reducerPath]: loansApi.reducer,
  [operationsApi.reducerPath]: operationsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
}

export const apiMiddleware = [
  accountsApi.middleware,
  loansApi.middleware,
  operationsApi.middleware,
  userApi.middleware,
]
