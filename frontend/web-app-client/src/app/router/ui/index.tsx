import { useAuth } from 'oidc-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from 'widgets/header'
import { finishRedirect } from 'features/auth'
import { useAppDispatch, useAppSelector } from 'shared/lib'

export const Layout = () => {
  const navigate = useNavigate()
  const { userData } = useAuth()
  const state = userData?.state
  const redirected = useAppSelector((state) => state.authReducer.redirected)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (state && !redirected) {
      navigate(state)
      setTimeout(() => dispatch(finishRedirect()), 150)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <>
      <Header />
      <main className='mb-5 mt-3 px-1 md:px-5 w-full h-full'>
        <Outlet />
      </main>
    </>
  )
}
