import { Outlet } from 'react-router-dom'
import { Header, Footer } from 'widgets'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='mb-5 mt-3 px-5 w-full h-full'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
