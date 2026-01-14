import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Messages from './Messages.jsx'
import Notfound from './Notfound.jsx'
import Profile from './Profile.jsx'

  const router = createBrowserRouter([
    { element: <App />,
      children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/messages", element: <Messages />},
      { path: "/profile", element: <Profile /> },
      { path: "*", element: <Notfound /> }
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
