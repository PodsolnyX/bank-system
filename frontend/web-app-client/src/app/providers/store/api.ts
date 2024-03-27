import {
  accountsApi,
  loansApi,
  operationsApi,
  tariffsApi,
  preferencesApi,
  userApi,
} from 'shared/api'

export const apiReducers = {
  [accountsApi.reducerPath]: accountsApi.reducer,
  [loansApi.reducerPath]: loansApi.reducer,
  [tariffsApi.reducerPath]: tariffsApi.reducer,
  [operationsApi.reducerPath]: operationsApi.reducer,
  [preferencesApi.reducerPath]: preferencesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
}

export const apiMiddleware = [
  accountsApi.middleware,
  loansApi.middleware,
  tariffsApi.middleware,
  operationsApi.middleware,
  preferencesApi.middleware,
  userApi.middleware,
]
