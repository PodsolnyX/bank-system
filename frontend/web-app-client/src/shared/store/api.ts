import { accountsApi, loansApi, operationsApi, userApi, tariffsApi } from 'shared/api'
import { preferencesApi } from 'shared/api/preferences'

export const apiReducers = {
  [accountsApi.reducerPath]: accountsApi.reducer,
  [loansApi.reducerPath]: loansApi.reducer,
  [tariffsApi.reducerPath]: tariffsApi.reducer,
  [operationsApi.reducerPath]: operationsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [preferencesApi.reducerPath]: preferencesApi.reducer,
}

export const apiMiddleware = [
  accountsApi.middleware,
  loansApi.middleware,
  tariffsApi.middleware,
  operationsApi.middleware,
  userApi.middleware,
  preferencesApi.middleware,
]
