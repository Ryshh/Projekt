import { initializeApp } from "firebase/app";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  
import firebaseConfig from "../firebaseConfig"
import './App.css'
import Home from './Home'
import Login from './Login'
import Messages from "./Messages"
import Notfound from './Notfound'

export default function App() {

  const app = initializeApp(firebaseConfig);

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/messages", element: <Messages />},
    { path: "*", element: <Notfound /> }
  ])

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}