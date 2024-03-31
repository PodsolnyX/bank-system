import { WSHistory } from 'socket'
import { UserServiceInst } from './User'

export const WSHistoryInst = new WSHistory(UserServiceInst)
