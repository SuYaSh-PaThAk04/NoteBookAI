import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Dashboard from "./pages/Dashboard/Dashboard"
import { useEffect, useState } from "react"

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";



function App() {
  const [darkMode,setDarkMode]=useState(false);

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark")
    }
  },[darkMode]);
 

  return (
    <>
      <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>

    </>
  )
}

export default App
