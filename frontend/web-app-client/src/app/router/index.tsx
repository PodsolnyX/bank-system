import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage, ErrorPage } from 'pages'
import { Layout } from './ui'
import { publicRoutes } from './config/publicOnly'
import { privateRoutes } from './config/authOnly'

export const ApplicationRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        ...publicRoutes,
        ...privateRoutes,
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
