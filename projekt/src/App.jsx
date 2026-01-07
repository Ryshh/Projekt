import { initializeApp } from "firebase/app";
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom'  
import firebaseConfig from "../firebaseConfig"
import './App.css'
import Home from './Home'
import Login from './Login'
import Messages from "./Messages"
import Notfound from './Notfound'
import { UserContext } from './UserContext'
import { AppContext } from './AppContext'
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {

  let [ user, setUser ] = useState({})
  const userContext = {user, setUser, loggedIn: user?.accessToken != null}

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)
  const navigate = useNavigate()
  const appContext = {app, auth, navigate, db}

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  }, [])

  console.log(user);
  

  return (
    <div className='app'>
      <AppContext value={appContext}>
        <UserContext value={userContext}>
          <Outlet></Outlet>
        </UserContext>
      </AppContext>
    </div>
  )
}