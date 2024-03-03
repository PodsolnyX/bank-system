import axios from 'axios'

export const CoreReq = axios.create({
  baseURL: 'http://109.107.189.133:7002',
})
