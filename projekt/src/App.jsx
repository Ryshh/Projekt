import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig"
import './App.css'

export default function App() {

  const app = initializeApp(firebaseConfig);

  return (
    <div className='app'>
      
    </div>
  )
}