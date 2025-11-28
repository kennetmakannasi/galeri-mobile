import { useState } from "react";
import { months } from "../components/json/months";
import BottomDrawer from "./bottomDrawer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api, UseToken } from "../helpers/api";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../helpers/date";

export default function NotificationContainer({id, message, date, isRead, type, notifiedId}){

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

    async function handleClick(id) {
        navigate(`${type === 'App\\Models\\User' ? '/profile' :'/post'}/${type === 'App\\Models\\User' ? message.split(" ")[0] :notifiedId}`)
        await readNotification(id)
    }

    const typeString = message.split(" ")[1]

    return(
        <>
        <div className={`${isRead ? '':'bg-accent-dark-gray'} px-2 pt-2  rounded-lg`}>
                <div className="flex items-center justify-between">
                    <button className="w-full" type="button" onClick={()=>handleClick(id)}>
                        <div className="mt-1 text-start flex items-center">
                            <Icon icon={typeString == 
                                'liked' ?'mdi:heart' : 
                                typeString == 'followed' ? 'mdi:account-plus':
                                typeString == 'commented' ? 'uil:comment-lines':''}
                            />
                            <div className="ml-3">
                                <p className="text-sm text-gray-200 max-w-80">{message}</p>
                                <div className="flex items-center mt-1">
                                    <p className="text-xs text-text-gray">
                                       {formatDate(date)}
                                    </p>   
                                    <div className={`bg-bright-yellow size-2 ml-2 rounded-full ${isRead ? 'opacity-0':''}`}></div>    
                                </div>    
                            </div>
                        </div>
                    </button>
                    <button className="p-1 rounded-full hover:bg-accent-dark-gray duration-150 transition-all"
                        onClick={()=>setIsDrawerOpen(true)}>
                         <Icon icon={"bi:three-dots"} height={18} />
                    </button>
                </div>  
                <div className="h-px bg-dark-gray mt-4 mb-2"></div>  
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