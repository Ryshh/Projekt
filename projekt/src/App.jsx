import { initializeApp } from "firebase/app";
import { Outlet, useNavigate } from 'react-router-dom'
import firebaseConfig from "../firebaseConfig"
import './App.css'
import { UserContext } from './UserContext'
import { AppContext } from './AppContext'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {

  let [ user, setUser ] = useState(null) 
  let [ userInfo, setUserInfo ] = useState({})
  
  const loggedIn = user !== null && user.uid != null
  const userContext = {user, setUser, userInfo, setUserInfo, loggedIn}

  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => createTheme({
      palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
              default: darkMode ? '#121212' : '#f0f2f5',
              paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
      },
  }), [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  let [ currentPage, setCurrentPage ] = useState("home")
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)
  const navigate = useNavigate()

  const appContext = {
      app, auth, navigate, db, currentPage, setCurrentPage, 
      darkMode, toggleDarkMode 
  }

  async function fetchSpecificUserInfo(uid) {
    if (!uid) return
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserInfo({ ...docSnap.data(), id: docSnap.id });
    } 
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSpecificUserInfo(currentUser.uid); 
      } else {
        setUserInfo({});
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className='app'>
      <AppContext.Provider value={appContext}>
        <UserContext.Provider value={userContext}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
          </ThemeProvider>
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  )
}