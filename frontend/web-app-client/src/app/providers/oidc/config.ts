import { WebStorageStateStore } from 'oidc-client-ts'
import { AuthProviderProps, UserManager } from 'oidc-react'
import { setToken, unsetToken } from 'features/auth'
import { TOKEN_LS_NAME } from 'shared/config'
import { store } from '../store'

export const oidcConfig: AuthProviderProps = {
  onSignIn: (userData) => {
    try {
      localStorage.clear()
      if (userData?.profile.sub) {
        localStorage.setItem(TOKEN_LS_NAME, userData.access_token)
        const channel4Broadcast = new BroadcastChannel('channel4')
        channel4Broadcast.postMessage({ key: userData.access_token })
        store.dispatch(setToken(userData.access_token))
      } else {
        localStorage.removeItem(TOKEN_LS_NAME)
        store.dispatch(unsetToken())
      }
    } catch {
      //empty
    }
  },
  onBeforeSignIn() {
    return location.pathname
  },
  userManager: new UserManager({
    authority: 'http://192.168.1.6:7005',
    client_id: 'client',
    client_secret: 'client-secret',
    redirect_uri: location.origin,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://192.168.1.6:7005',
    includeIdTokenInSilentRenew: true,
    includeIdTokenInSilentSignout: true,
    revokeTokensOnSignout: true,
    revokeTokenTypes: ['access_token', 'refresh_token'],
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  }),
}
