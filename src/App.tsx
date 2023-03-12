import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import NFTPage from './pages/NFT'
import LoginProvider from './shared/providers/LoginProvider'

const Home = lazy(() => import('@/pages/Home'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/nfts',
    element: <NFTPage />,
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 6 * 1000 * 5,
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </QueryClientProvider>
  )
}

export default App
