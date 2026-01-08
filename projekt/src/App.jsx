import { initializeApp } from "firebase/app";
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom'  
import firebaseConfig from "../firebaseConfig"
import './App.css'
import { UserContext } from './UserContext'
import { AppContext } from './AppContext'
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {

  let [ user, setUser ] = useState({})
  let [ userInfo, setUserInfo ] = useState({})
  const loggedIn = user?.accessToken != null
  const userContext = {user, setUser, userInfo, setUserInfo, loggedIn}


  let [ currentPage, setCurrentPage ] = useState("home")
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)
  const navigate = useNavigate()
  const appContext = {app, auth, navigate, db, currentPage, setCurrentPage}

  async function getUserInfo() {
    if (!loggedIn || userInfo.userID) return

    const adatCollection = collection(db, 'users');
    const adatSnapshot = await getDocs(query(adatCollection, where("userID", "==", user.uid)));

    setUserInfo(adatSnapshot.docs[0].data()) 
    console.log(adatSnapshot.docs[0].data());
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    getUserInfo()
  }, [user])

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