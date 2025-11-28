import { useEffect, useState } from "react";
import { api, UseToken } from "../helpers/api";
import NotificationContainer from "../components/notificationContainer";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function NotificationPage() {
    const [data, setData] = useState([]);
    const [newNotifCount, setNewNotifCount] = useState();
    const [filtering, setFiltering] = useState('all');

    async function fetchNotifications() {
        try{
            const res = await api.get(`/api/notification?from=${filtering}`, {
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            })
            setNewNotifCount(res.data.content.new_notification)
            setData(res.data.content.notifications)
        }catch(e){
            console.error(e)
        }
    }

    async function handleReadAll() {
        try{
            await api.post("api/notification/readAll",{},{
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            })
            fetchNotifications()
        }catch(e){
            console.error(e)
        }
    }

    console.log(data)

    useEffect(()=>{
        fetchNotifications()
    },[filtering])

    return (
        <div className=" text-white px-4 md:px-12 py-8">
        <h2 className="text-xl font-bold mb-4 text-bright-yellow">
            Notif<span className="text-white">ications</span>
        </h2>
        <p>You Have {newNotifCount || 0} new Notifications</p>
        
        
        <div className="grid lg:grid-cols-2">
            <div className="my-3 overflow-x-auto flex gap-2">
            {['all', 'follow', 'like', 'comment'].map(f => (
                <button
                    key={f}
                    onClick={() => setFiltering(f)}
                    className={`px-3 py-1 flex rounded-full font-medium transition-all whitespace-nowrap ${
                        filtering === f
                            ? 'bg-bright-yellow hover:bg-accent-bright-yellow text-black'
                            : 'bg-dark-gray hover:bg-accent-dark-gray'
                    }`}
                >
                    {f === 'all' ? 'All'  : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
            </div>   
            {newNotifCount> 0 && (
                <div className="flex lg:justify-end mb-4">
                    <button 
                        onClick={handleReadAll} 
                        className="flex items-center text-sm text-bright-yellow hover:text-bright-yellow transition-colors"
                    >
                        <Icon icon="ic:round-mark-chat-read" className="mr-2 h-5 w-5" />
                        Tandai Semua Sudah Dibaca
                    </button>
                </div>     
            )}
            
        </div>

        <div className="mt-3">
            {data.length === 0 ? (
                [...Array(10)].map((item)=>(
                    <div key={item} className="h-18 rounded-lg bg-dark-gray w-full mb-2 animate-pulse"></div>    
                ))
            ):(
                data.map((item)=>(
                    <NotificationContainer id={item.id} message={item.message} date={item.created_at} isRead={item.is_read} type={item.notified_object_type} notifiedId={item.notified_object_id}/>
                ))
            )}    
        </div>

        </div>
    );
}