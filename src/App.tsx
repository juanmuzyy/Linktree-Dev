import { createBrowserRouter } from 'react-router-dom'
import { Home } from './PAGES/home'
import { Admin } from './PAGES/admin'
import { Login } from './PAGES/login'
import { Networks } from './PAGES/networks'
import { ErrorPage } from './PAGES/error'

import { Private } from './routes/Private'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin",
    element: <Private><Admin/></Private>
    
  },
  {
    path: "/admin/social", 
    element: <Networks/>
  },
  {
    path:"*",
    element: <ErrorPage/>
  }
  
  
] )

export {router}