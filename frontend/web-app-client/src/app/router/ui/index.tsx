import { Outlet } from 'react-router-dom'
import { Header, Footer } from 'widgets'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='my-3 px-2 py-1 w-full h-full'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
