import { toast } from 'react-toastify'

const TIMEOUT_MS = 200

export const toastSuccess = (msg: string) => setTimeout(toast.success, TIMEOUT_MS, msg)
export const toastError = (msg: string) => setTimeout(toast.error, TIMEOUT_MS, msg)
