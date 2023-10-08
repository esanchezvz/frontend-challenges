import { createBrowserRouter } from 'react-router-dom'

import ReactMidLevelTable from '@/challenges/mid-level-react-table'
import ReactTransferList from '@/challenges/tansfer-list'
import Root from '@/root'

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'react-mid-level-table',
    element: <ReactMidLevelTable />,
  },
  {
    path: 'transfer-list',
    element: <ReactTransferList />,
  },
])
