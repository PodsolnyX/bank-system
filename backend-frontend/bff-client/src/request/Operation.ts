import axios from 'axios'

export const OperationReq = axios.create({
  baseURL: 'http://109.107.189.133:7004',
})
