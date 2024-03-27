import { jwtDecode } from 'jwt-decode'

type UserProfile = {
  id: string
  name: string
  mail: string
}

const DefaultProfile: UserProfile = {
  id: '-',
  mail: 'Не определен',
  name: 'Не определено',
}

export const extractFromJWT = (token: string | undefined | null): UserProfile => {
  try {
    if (!token) {
      return DefaultProfile
    }
    const decoded = jwtDecode(token) as any
    const jwt_name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    const jwt_mail =
      decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    const jwt_id = decoded['sub']
    return {
      name: jwt_name || DefaultProfile.name,
      id: jwt_id || DefaultProfile.id,
      mail: jwt_mail || DefaultProfile.mail,
    }
  } catch {
    return DefaultProfile
  }
}
