import { useLogoutMutation } from 'shared/api'
import { toastError } from 'shared/toast'

export interface BanPageProps {
  bannedAt: string
}

export const BanPage = (props: BanPageProps) => {
  const [trigger] = useLogoutMutation()
  const onExit = async () => {
    try {
      await trigger()
      localStorage.clear()
      location.reload()
    } catch {
      toastError('Ошибка')
    }
  }
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='text-red-500'>Доступ закрыт! Ваш аккаунт заблокирован!</div>
      <div className='text-red-500'>
        Дата блокировки: {new Date(props.bannedAt).toLocaleDateString()}
      </div>
      <div className='text-red-300 cursor-pointer' onClick={onExit}>
        Выход
      </div>
    </div>
  )
}
