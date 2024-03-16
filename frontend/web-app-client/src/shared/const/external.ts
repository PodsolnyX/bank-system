import { AppRoutes } from "shared/const/router"

const get_redirect_uri = () => window.location.origin + AppRoutes.FINISH_LOGIN
const clientId = '1000'
const OAuthURL = 'http://109.107.189.133:7005/'

export const getOAuthLoginLink = () => {
    const params = new URLSearchParams({
        clientId: clientId,
        returnUrl: get_redirect_uri()
    }).toString()
    return `${OAuthURL}/account/login?${params}`
}
export const getOAuthRegisterLink = () => {
    const params = new URLSearchParams({
        clientId: clientId,
        returnUrl: get_redirect_uri()
    }).toString()
    return `${OAuthURL}/account/register?${params}`
}