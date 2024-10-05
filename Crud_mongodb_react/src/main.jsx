import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import User from './User.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Update from './Update.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App></App>
  },

    {
      path: '/users',
      element: <User></User>,
      loader: () => fetch('http://localhost:5000/users')
    },
    {
      path:'/updates/:id',
      element: <Update></Update>,
      loader: ({params}) => fetch(`http://localhost:5000/updates/${params.id}`)
    }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
