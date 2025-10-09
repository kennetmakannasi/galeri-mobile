import ScrollGrid from "../components/scrollGrid";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReportModal from "../components/reportModal";
import { MenuItem } from "@headlessui/react";
import { SessionData } from "../components/layout/mainLayout";
import { UseToken } from "../helpers/useToken";
import { Icon } from "@iconify/react/dist/iconify.js";
import BottomDrawer from "../components/bottomDrawer";

export default function User(){
  const {username} = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const id = data?.id
  const sessionData = useContext(SessionData)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  async function fetchSelfData() {
    try{
      const res = await axios.get(`${baseUrl}/api/users/${username}`,{
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      })
      setData(res.data.content)
      
    }catch(error){
      setError(true)
    }
 
  }

  async function handleFollow(id) {
    const res = await axios.post(`${baseUrl}/api/users/${id}/follow`,{},{
      headers: {
        Authorization: `Bearer ${UseToken()}`
      }
    })
  }

  useEffect(()=>{
    fetchSelfData()
    setError(false)
  },[username])

  return(
    <>
    {
   error ? (
      <p>not found</p>
    ):(
      <div className="min-h-screen text-white px-4 md:px-12">
        <ReportModal open={isDialogOpen} 
          onClose={()=>setIsDialogOpen(false)} 
          triggerClose={()=>setIsDialogOpen(false)}
          repObj={"user"}
          repId={id}
          repUserId={data?.id}
        />
        <div className="w-full h-full relative mb-16">
          {data?.profile_banner ? (
            <img
                src={baseUrl + data?.profile_banner || 'a'}
                alt="hero"
                className="w-full h-48 mt-8 object-cover rounded-4xl"
              />
          ):(
            <div className="w-full h-48 mt-8 object-cover rounded-4xl bg-dark-gray animate-pulse"></div>
          ) }
          {data ? (
            <img
              src={baseUrl + data?.profile_picture}
              alt="Profile"
              className="size-32 rounded-full border-4 border-black object-cover absolute -bottom-18 ml-3"
            />  
          ):(
            <div className="size-32 rounded-full border-4 border-black bg-dark-gray animate-pulse object-cover absolute -bottom-18 ml-3"></div>
          )}

        </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mt-5 col-span-2 relative w-full">
              {data ? (
                <div>
                  <h1 className="text-xl font-semibold max-w-72">{data?.name}</h1>
                  <p className="text-text-gray text-sm">{'@'+data?.username}</p>  
                </div>  
              ):(
                <div>
                  <div className="h-5 w-36 bg-dark-gray rounded-md animate-pulse"></div>
                  <div className="h-4 w-20 bg-dark-gray rounded-md animate-pulse mt-2"></div>
                </div>
              )}
              <div className=" absolute right-3 top-0">
                <button className="p-1 rounded-full hover:bg-accent-dark-gray duration-150 transition-all" onClick={()=> setIsDrawerOpen(!isDrawerOpen)}>
                  <Icon height={30} icon={"bi:three-dots"} />
                </button>
              </div>
            </div>
            <div className="w-full relative flex items-center md:col-start-2 h-36">
              <div className="md:absolute md:right-3">
                {id != sessionData?.id && (
                  <button
                    type="button"
                    onClick={()=>{handleFollow(id); fetchSelfData();}}
                    className=" w-full py-2 my-4 rounded-md text-sm bg-dark-gray hover:bg-accent-dark-gray transition-all duration-150"
                  >
                    {data?.isFollowing ? ('Unfollow'):('Follow')}
                  </button>
                )}
                {data ? (
                  <>
                    <div>
                      <span className="text-white font-semibold">{data?.follower}</span>
                      <span className="text-text-gray ml-1">followers</span>
                    </div>
                    <div>
                      <span className="text-white font-semibold">{data?.followed}</span>
                      <span className="text-text-gray ml-1.5">following</span>
                    </div>  
                  </>
                ):(
                  <>
                  <div className="h-4 w-20 bg-dark-gray rounded-md animate-pulse mt-2"></div>
                  <div className="h-4 w-20 bg-dark-gray rounded-md animate-pulse mt-2"></div>
                  </>
                )}

              </div>
            </div>
        </div>
        <div className="w-full relative ">
        </div>
        <div>
          <div className="mx-auto w-full h-[2px] bg-bright-yellow mt-6 mb-12"></div>
          {id &&(
            <ScrollGrid endpoint={`users/${id}/post`}/>   
          )}
          
        </div>
      </div>
    )   
    }
    <BottomDrawer isOpen={isDrawerOpen}
    onClose={()=> setIsDrawerOpen(false)}
    drawerContent={
      <div className="flex flex-col gap-3">
        {id == sessionData?.id ? (
          <Link to="/profile/edit">
            <button
            type="button"
            className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
            >
            Edit Profile
            </button>
          </Link> 
        ):(
          <div className="flex flex-col">
            <button
                type="button"
                className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              Report
            </button>
          </div>
        )}
      </div>
    }
    />
    </>
    )
}