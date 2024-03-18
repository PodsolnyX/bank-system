import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useLogoutMutation } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { toastError, toastSuccess } from 'shared/toast'
import { Spinner } from 'shared/ui'

export const LogoutPage = () => {
  const [trigger, { isLoading }] = useLogoutMutation()
  // const dispatch = useAppDispatch()

  useEffect(() => {
    const Logout = async () => {
      try {
        await trigger()
        localStorage.removeItem('email')
        //dispatch(unsetEmail())
        toastSuccess('Вы Вышли')
      } catch {
        toastError('Произошла ошибка')
      }
    }
    Logout()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return <Navigate to={AppRoutes.MAIN} />
}
