declare type RootState = ReturnType<typeof import('app/providers/store').store.getState>
declare type AppStore = typeof import('app/providers/store').store
declare type AppDispatch = typeof import('app/providers/store').store.dispatch
