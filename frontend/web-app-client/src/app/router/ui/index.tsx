import { Outlet } from 'react-router-dom'
import { Header } from 'widgets/header'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='mb-5 mt-3 px-1 md:px-5 w-full h-full'>
        <Outlet />
      </main>
    </>
  )
}
