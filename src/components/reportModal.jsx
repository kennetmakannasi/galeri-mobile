import { Dialog , DialogPanel } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import axios from "axios"
import { UseToken } from "../helpers/useToken"
import ModalLayout from "./layout/modalLayout";

export default function ReportModal({open, onClose, repObj, triggerClose, repId, repUserId}){
    const baseUrl = import.meta.env.VITE_API_URL;

    async function handleReport(msg) {
        const payload =
        {
            reporter_obj: repObj,
            object_id: repId,
            reported_user_id: repUserId,
            reporter_msg: msg
        }

        await axios.post(`${baseUrl}/api/report`
        ,payload,
        {
            headers: {
            Authorization: `Bearer ${UseToken()}`
            }
        }
        )
    }

    return(
        <ModalLayout open={open} onClose={onClose} content={
            <div className="w-80 md:w-96">
                <div className="flex items-center relative justify-center">
                    <button className="absolute left-0" onClick={triggerClose}>
                        <Icon height={30} icon={'iconoir:cancel'}/>
                    </button>
                    <p>Report</p>
                </div>
                <div className="h-1 w-full bg-light-gray rounded-full my-2"></div> 
                <p className="ml-3 mt-2">Why are you Reporting?</p>  
                <ul className="mt-3">
                    <li className="bg-light-gray rounded-lg hover:bg-accent-light-gray transition-all duration-150">
                        <button className="ml-4 py-2" onClick={()=>handleReport('option1')}>Option1</button>
                    </li>
                    <li className="bg-light-gray rounded-lg mt-2 hover:bg-accent-light-gray transition-all duration-150">
                        <button className="ml-4 py-2" onClick={()=>handleReport('option2')}>Option2</button>
                    </li>
                    <li className="bg-light-gray rounded-lg mt-2 hover:bg-accent-light-gray transition-all duration-150">
                        <button className="ml-4 py-2" onClick={()=>handleReport('option3')}>Option3</button>
                    </li>
                    <li className="bg-light-gray rounded-lg mt-2 hover:bg-accent-light-gray transition-all duration-150">
                        <button className="ml-4 py-2" onClick={()=>handleReport('option4')}>Option4</button>
                    </li>
                    <li className="bg-light-gray rounded-lg mt-2 hover:bg-accent-light-gray transition-all duration-150">
                        <button className="ml-4 py-2" onClick={()=>handleReport('option5')}>Option5</button>
                    </li>
                </ul>
            </div>
        }/>
    )
}