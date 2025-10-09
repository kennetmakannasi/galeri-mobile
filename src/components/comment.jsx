import { Icon } from "@iconify/react/dist/iconify.js"
import Dropdown from "./dropdown"
import { MenuItem } from "@headlessui/react"
import { useContext, useState } from "react"
import ReportModal from "./reportModal"
import { Link, useNavigate } from "react-router"
import { UseToken } from "../helpers/useToken"
import EditComment from "./editComment"
import axios from "axios"
import { SessionData } from "./layout/mainLayout"
import { months } from "./json/months"

export default function Comment ({id,repUserId, profilePicture, username, date, comment, profileLink}){
    const baseUrl = import.meta.env.VITE_API_URL;
    const [isDialogOpen , setIsDialogOpen] = useState(false);
    const [isEditDialog, setIsEditDialog] = useState(false);
    const navigate = useNavigate();
    const sessionData = useContext(SessionData);

    async function handleDelete() {
      await axios.delete(`${baseUrl}/api/comment/${id}`,{
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      })

    navigate(0)
  }

    return(
        <div key={id} className="flex items-start gap-3">
          <Link to={`/profile/${profileLink}`}>
          <div className="size-9 relative">
            <div className="absolute inset-0 size-full rounded-full bg-black/30 opacity-0 hover:opacity-100 transition-all duration-150"></div>
            <img
              src={baseUrl + profilePicture}
              alt="c-avatar"
              className="size-full rounded-full object-cover"
            />
          </div>
          </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link to={`/profile/${profileLink}`}>
                    <p className="text-sm font-medium hover:underline hover:underline-offset-4">{username}</p>
                  </Link>
                  <span className="text-text-gray ml-1 text-sm">{' · '+ months[date.slice(5,7).replace('0','')] +' '+ date.slice(8,10) + ', ' + date.slice(0,4)}</span>  
                </div>
                
                <Dropdown
                buttonContent={<Icon icon={"bi:three-dots"} height={18} />}
                dropdownContent={
                  <MenuItem>
                    <div className="flex flex-col">
                      {profileLink == sessionData?.username ? (
                        <>
                          <button onClick={()=>setIsEditDialog(!isEditDialog)} className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded">
                            Edit
                          </button>
                          <button onClick={handleDelete} className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded">
                            Delete Comment
                          </button>
                        </>
                      ):(
                                        <button
                        type="button"
                        className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                          onClick={() => setIsDialogOpen(!isDialogOpen)}
                    >
                        Report
                    </button>    
                      )}

                    </div>
                  </MenuItem>
                }
              />
              </div>
              <p className="mt-1 text-sm text-gray-200">{comment}</p>
            </div>
            <ReportModal open={isDialogOpen} 
                onClose={()=>setIsDialogOpen(false)} 
                triggerClose={()=>setIsDialogOpen(false)}
                repObj={"comment"}
                repId={id}
                repUserId={repUserId}
            />
            <EditComment open={isEditDialog}
            onClose={()=>setIsEditDialog(false)} 
            commentId={id}
            />
        </div>
    )
}