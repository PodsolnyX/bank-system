import { AppRoutes } from "shared/const/router"

const get_redirect_uri = () => window.location.origin + AppRoutes.FINISH_LOGIN
const clientId = '1000'
const OAuthURL = 'http://109.107.189.133:7001/oauth'

export const getOAuthLoginLink = () => {
    const params = new URLSearchParams({
        clientId: clientId,
        redirect_uri: get_redirect_uri()
    }).toString()
    return `${OAuthURL}?${params}`
}
export const getOAuthRegisterLink = () => {
    const params = new URLSearchParams({
        clientId: clientId,
        redirect_uri: get_redirect_uri()
    }).toString()
    return `${OAuthURL}/register?${params}`
}