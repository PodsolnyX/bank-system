export interface BanPageProps {
  banedAt: string
}

export const BanPage = (props: BanPageProps) => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='text-red-500'>Доступ закрыт! Ваш аккаунт заблокирован!</div>
      <div className='text-red-500'>Дата блокировки: {props.banedAt}</div>
    </div>
  )
}
