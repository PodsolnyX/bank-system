import axios from 'axios'

export const LoanReq = axios.create({
  baseURL: 'http://109.107.189.133:7003',
})
