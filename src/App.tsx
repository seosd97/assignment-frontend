import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import NFTPage from './pages/NFT'
import TransferPage from './pages/Transfer'
import LoginProvider from './shared/providers/LoginProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/nfts',
    element: <NFTPage />,
  },
  {
    path: '/:id/transfer',
    element: <TransferPage />,
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
