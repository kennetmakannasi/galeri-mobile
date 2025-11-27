import { useState } from "react";
import { months } from "../components/json/months";
import BottomDrawer from "./bottomDrawer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api, UseToken } from "../helpers/api";
import { useNavigate } from "react-router";

export default function NotificationContainer({id, message, date, isRead}){

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()

    async function deleteNotification(id) {
        try{
            await api.delete(`/api/notification/${id}`, {
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            })
            navigate(0)
        }catch(e){
            console.error(e)
        }
    }

    async function readNotification(id) {
        try{
            await api.post(`/api/notification/read/${id}`,{}, {
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            })
            navigate(0)
        }catch(e){
            console.error(e)
        }
    }

    return(
        <>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`bg-bright-yellow size-3 rounded-full ${isRead ? 'opacity-0':''}`}></div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-200 max-w-80">{message}</p>
                            <p className="mt-1 text-xs text-text-gray">
                            {date?.slice(11,16)} 
                            {date?.slice(11,13) <= 12 ? (' am'):(' pm')}
                            {' · '+ months[date?.slice(5,7).replace('0','')] +' '+ date?.slice(8,10) + ', ' + date?.slice(0,4)}
                            </p>         
                        </div>
                    </div>
                    <button className="p-1 rounded-full hover:bg-accent-dark-gray duration-150 transition-all"
                        onClick={()=>setIsDrawerOpen(true)}>
                         <Icon icon={"bi:three-dots"} height={18} />
                    </button>
                </div>  
                <div className="h-px bg-dark-gray my-4"></div>  
            </div>
            <BottomDrawer 
                isOpen={isDrawerOpen}
                onClose={()=>setIsDrawerOpen(!isDrawerOpen)}
                drawerContent={
                    <div className="flex flex-col">
                        <button onClick={()=>readNotification(id)} className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded">
                            Mark As Read
                        </button>
                        <button onClick={()=>deleteNotification(id)} className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded">
                            Delete Notification
                        </button>
                    </div>
                }
            />
        </>

    )
}