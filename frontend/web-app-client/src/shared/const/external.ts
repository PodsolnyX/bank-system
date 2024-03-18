import { AppRoutes } from 'shared/const/router'

const get_redirect_uri = () => window.location.origin + AppRoutes.FINISH_LOGIN
const clientId = '1000'
const OAuthURL = 'https://coto-dev.ru'

export const getOAuthLoginLink = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: 'client',
    state: 'any-string',
    redirect_uri: 'https://coto-dev.ru/account/login',
    code_challenge: 'EfMk_8lATvrflWnmD7_Zq7ZIIhsJXYo3oM-k_WU5Ly0',
    code_challenge_method: 'S256',
    returnUrl: get_redirect_uri(),
  }).toString()
  return `${OAuthURL}/connect/authorize?${params}`
}
export const getOAuthRegisterLink = () => {
  const params = new URLSearchParams({
    clientId: clientId,
    returnUrl: get_redirect_uri(),
  }).toString()
  return `${OAuthURL}/account/register?${params}`
}
