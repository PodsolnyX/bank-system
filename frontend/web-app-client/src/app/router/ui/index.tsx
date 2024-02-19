import { Outlet } from 'react-router-dom'
import { Header, Footer } from 'widgets'

export const Layout = () => {
  return (
    <div className='w-full h-full flex flex-col bg-green-100'>
      <Header />
      <main className='px-2 py-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
