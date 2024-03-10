import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'shared/store'
import { Header, Footer } from 'widgets'

export const Layout = () => {
  const mail = useAppSelector((store) => store.authReducer.mail)

  if (!mail) {
    return <Outlet />
  }

  return (
    <>
      <Header />
      <main className='mb-5 mt-3 px-1 md:px-5 w-full h-full'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
