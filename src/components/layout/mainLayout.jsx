import { createContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import { Outlet, useLocation, useNavigate } from "react-router"
import axios from "axios";
import Cookies from "js-cookie";
import Notification from "../../notificationEcho";
import { Toaster } from "react-hot-toast";


export const SessionData = createContext()

export default function MainLayout() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token")
  const navigate = useNavigate();
  const [selfData , setSelfData] = useState(); 
  const location = useLocation()
  

  async function fetchSelfData() {
    const res = await axios.get(`${baseUrl}/api/auth/self`,{
       headers: {
        Authorization: `Bearer ${token}`
      }
    })
    Cookies.set('uId', res.data.content.id ,{expires:7})
    setSelfData(res.data.content)
  }

  useEffect(()=>{
    fetchSelfData()
  },[])

  function middleware(){
    if(!token){
      navigate('/auth/login')
    }
  }

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
  },[location.pathname])

  useEffect(()=>{
    middleware()
  },[token])

  return (
    <SessionData.Provider value={selfData}>
      <Toaster/>
      
        <Notification/>
        <div className="flex-1">
          <Outlet />
        </div>
        <Navbar/>
    </SessionData.Provider>
  );
}
