import { useEffect, useState } from "react";
import { api, UseToken } from "../helpers/api";
import NotificationContainer from "../components/notificationContainer";

export default function Notification() {
    const [data, setData] = useState([]);

    async function fetchNotifications() {
        try{
            const res = await api.get("/api/notification", {
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            })

            setData(res.data.content)
        }catch(e){
            console.error(e)
        }
    }

    console.log(data)

    useEffect(()=>{
        fetchNotifications()
    },[])

    return (
        <div className=" text-white px-4 md:px-12 py-8">
        <h2 className="text-xl font-bold mb-4 text-bright-yellow">
            Notif<span className="text-white">ications</span>
        </h2>
        <div className="mt-8">
            {data?.map((item)=>(
                <NotificationContainer id={item.id} message={item.message} date={item.created_at} isRead={item.is_read} type={item.notified_object_type} notifiedId={item.notified_object_id}/>
            ))}    
        </div>

        </div>
    );
}
