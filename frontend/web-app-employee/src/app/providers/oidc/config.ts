import { WebStorageStateStore } from 'oidc-client-ts'
import { AuthProviderProps, UserManager } from 'oidc-react'
import {removeAccessToken, setAccessToken} from "../../../shared/helpers/localStorageHelpers.ts";
import {instance} from "../../../shared/api/instance.ts";


export const oidcConfig: AuthProviderProps = {
    onSignIn: (userData) => {
        try {
            localStorage.clear()
            if (userData?.profile.sub) {
                setAccessToken(userData.access_token);
                instance.defaults.headers["Authorization"] = `Bearer ${userData.access_token}`;
            } else {
                removeAccessToken()
            }
        } catch {}
    },
    onBeforeSignIn() {
        return location.pathname
    },
    userManager: new UserManager({
        authority: 'https://coto-dev.ru',
        client_id: 'client',
        client_secret: 'client-secret',
        redirect_uri: location.origin,
        automaticSilentRenew: true,
        silent_redirect_uri: 'https://coto-dev.ru',
        includeIdTokenInSilentRenew: true,
        includeIdTokenInSilentSignout: true,
        revokeTokensOnSignout: true,
        revokeTokenTypes: ['access_token', 'refresh_token'],
        // @ts-ignore
        userStore: new WebStorageStateStore({ store: window.localStorage }),
    }),
}