import { AuthProviderProps } from 'oidc-react'
import { ID_LS_NAME } from 'shared/config'
import { setId, store, unsetId } from '../store'

export const oidcConfig: AuthProviderProps = {
  onSignIn: (userData) => {
    if (userData?.profile.sub) {
      localStorage.setItem(ID_LS_NAME, userData.profile.sub)
      store.dispatch(setId(userData.profile.sub))
    } else {
      localStorage.removeItem(ID_LS_NAME)
      store.dispatch(unsetId())
    }
  },
  authority: 'https://coto-dev.ru',
  clientId: 'client',
  clientSecret: 'client-secret',
  redirectUri: location.origin,
}
