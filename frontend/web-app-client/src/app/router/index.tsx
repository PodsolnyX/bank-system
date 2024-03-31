import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage, ErrorPage } from 'pages'
import { privateRoutes } from './config/authOnly'
import { Layout } from './ui'

export const ApplicationRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [...privateRoutes, { path: '*', element: <NotFoundPage /> }],
    },
  ])

  return <RouterProvider router={router} />
}
