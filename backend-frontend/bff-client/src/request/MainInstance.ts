import axios from 'axios'

export const MainInstance = axios.create({
  baseURL: 'http://109.107.189.133:7002',
})
