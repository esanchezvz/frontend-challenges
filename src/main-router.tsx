import { createBrowserRouter } from 'react-router-dom'

import Root from '@/root'

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
])
