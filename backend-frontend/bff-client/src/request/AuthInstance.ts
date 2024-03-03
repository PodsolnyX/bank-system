import axios from 'axios'

export const AuthInstance = axios.create({
  baseURL: 'http://109.107.189.133:7001',
})
