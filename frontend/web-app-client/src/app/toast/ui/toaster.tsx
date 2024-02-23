import { ToastContainer } from 'react-toastify'
import { ToasterProps } from 'app/toast/config'

export const Toaster = () => {
    return <ToastContainer {...ToasterProps}/>
}