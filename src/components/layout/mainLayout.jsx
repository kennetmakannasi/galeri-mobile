import { createContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import { Outlet, useLocation, useNavigate } from "react-router"
import axios from "axios";
import Cookies from "js-cookie";
import Notification from "../../helpers/notificationEcho";
import { Toaster } from "react-hot-toast";
import ReactPullToRefresh from "react-pull-to-refresh";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "../../helpers/api";

export const SessionData = createContext()

export default function MainLayout() {
  const token = Cookies.get("token")
  const navigate = useNavigate();
  const [selfData , setSelfData] = useState(); 
  const location = useLocation()
  const [isRefresh, setIsRefresh] = useState(false);

  async function fetchSelfData() {
    const res = await api.get(`/api/auth/self`,{
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

  async function handleRefresh() {
    setIsRefresh(true)
    setTimeout(() => {
      navigate(0)
    }, 2000);
  }

  return (
    <SessionData.Provider value={selfData}>
      <ReactPullToRefresh onRefresh={handleRefresh}>
        <Toaster/>
        <Notification/>
        <div className="flex-1 mb-20">
          {isRefresh && (
            <div className="w-full flex items-center justify-center py-3">
              <Icon height={40} className="text-light-gray animate-spin" icon={'mingcute:loading-fill'}/>
            </div>
          )}
          <Outlet />
        </div>
        <Navbar/>  
      </ReactPullToRefresh>
    </SessionData.Provider>
  );
}
