import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import Dropdown from "../components/dropdown";
import { Form, Link, useFetcher, useNavigate, useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import ReportModal from "../components/reportModal";
import { MenuItem } from "@headlessui/react";
import Comment from "../components/comment";
import EditPost from "../components/editPost";
import { SessionData } from "../components/layout/mainLayout";
import { months } from "../components/json/months";
import { UseToken } from "../helpers/useToken";

export async function handleComment({request,params}) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const formData = await request.formData();
  const post_id = params.id
  const comment = formData.get("comment")
  const data = {
    post_id : post_id,
    comment : comment,
  }
    
  await axios.post(`${baseUrl}/api/comment`, data,
    {
      headers: {
        Authorization: `Bearer ${UseToken()}`
      }
    }
  )

  return null
}

export default function PostPage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const fetcher = useFetcher();
  const [data , setData] = useState();
  const [commentValue, setCommentValue] = useState("")
  const {id} = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const navigate = useNavigate()
  const sessionData = useContext(SessionData);

  async function fetchData() {
    const res = await axios.get(`${baseUrl}/api/post/${id}`
      ,
    {
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      }
    )
    setData(res.data.content)
  }

  useEffect(()=>{
    fetchData()
  },[])

  console.log(data)

  async function handleLike() {
    await axios.post(`${baseUrl}/api/like/${data.post.id}`
      ,{},
    {
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      }
    )
  }

  async function handleSave() {
    await axios.post(`${baseUrl}/api/save`
      ,{
        'post_id': data.post.id
      },
    {
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      }
    )
  }

  async function handleDelete() {
    await axios.delete(`${baseUrl}/api/post/${id}`,{
      headers: {
        Authorization: `Bearer ${UseToken()}`
      }
    })

    navigate('/')
  }

  useEffect(() => {
  if (fetcher.state === "idle" && fetcher.data == null) {
    fetchData();
    setCommentValue("")
  }
}, [fetcher.state]);

  return(
    <div className="min-h-screen bg-background-light-black text-white px-4 lg:px-20 py-6">
      <div className="max-w-3xl mx-auto">
        {/* post card */}
        <div className="bg-[#0b0b0b] rounded-lg p-4 shadow-md border border-dark-gray">
          {/* header */}
          <div className="flex items-start gap-3">
            {data ? (
              <Link to={`/profile/${data?.post?.user?.username}`}>
              <div className="size-10 relative">
                <div className="bg-black/30 opacity-0 hover:opacity-100 inset-0 size-full rounded-full absolute transition-all duration-150"></div>
                <img
                  src={baseUrl + data?.post?.user?.profile_picture}
                  alt="avatar"
                  className="size-full rounded-full object-cover border-2 border-[#2b2b2b]"
                />
              </div>
            </Link>
            ):(
              <div className="bg-dark-gray size-10 rounded-full animate-pulse"></div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  {data ? (
                    <>
                      <Link to={`/profile/${data?.post?.user?.username}`}>
                        <p className="font-medium hover:underline hover:underline-offset-4">{data?.post?.user?.name}</p>
                      </Link>
                      <p className="text-xs text-text-gray">{'@'+data?.post?.user?.username}</p> 
                    </>
                  ):(
                    <>
                    <div className="h-5 w-20 bg-dark-gray rounded-md animate-pulse"></div>
                    <div className="h-4 w-20 bg-dark-gray rounded-md animate-pulse mt-2"></div>
                    </>
                  )}
                  
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown
                    buttonContent={<Icon icon={"bi:three-dots"} height={18} />}
                    dropdownContent={
                      <MenuItem>
                        <div className="flex flex-col bg-background-light-black">
                          {data?.post?.user_id == sessionData?.id ? (
                            <>
                              <button 
                                className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                                onClick={()=> setIsEditDialogOpen(!isEditDialogOpen)} 
                              >
                                Edit
                              </button>
                              <button 
                                className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                                onClick={handleDelete} 
                              >
                                Delete Post
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
                <ReportModal open={isDialogOpen} 
                onClose={()=>setIsDialogOpen(false)} 
                triggerClose={()=>setIsDialogOpen(false)}
                repObj={"post"}
                repId={data?.post?.id}
                repUserId={data?.post?.user?.id}/>
                <EditPost open={isEditDialogOpen}
                onClose={()=>setIsEditDialogOpen(false)} 
                postId={id}
                />
              </div>
              {data?(
                <>
                  <p className="mt-3 text-lg font-semibold">
                    {data?.post?.title}
                  </p>
                  {/* caption */}
                  <p className="text-sm leading-relaxed">
                    {data?.post?.description}
                  </p>  
                </>
              ):(
                <div className="w-full h-16 mt-3 rounded-lg bg-dark-gray animate-pulse"></div>
              )}
              

            </div>
          </div>

          {/* image */}
          <div className="mt-4">
            {data ? (
              <img
                src={baseUrl + data?.post?.image_url}
                alt="post"
                className="w-full rounded-lg object-cover border border-[#222] max-h-[640px]"
              />  
            ):(
              <div className="bg-dark-gray w-full h-96 rounded-lg animate-pulse"></div>
            )}

          </div>

          {/* meta */}
          {data ? (
            <div className="mt-3 text-xs text-text-gray">
              {data?.post?.created_at.slice(11,16)} 
              {data?.post?.created_at.slice(11,13) <= 12 ? (' am'):(' pm')}
              {' · '+ months[data?.post?.created_at.slice(5,7).replace('0','')] +' '+ data?.post?.created_at.slice(8,10) + ', ' + data?.post?.created_at.slice(0,4)}
            </div>  
          ):(
            <div className="bg-dark-gray w-56 h-4 mt-3 rounded-md animate-pulse"></div>
          )}
          <div className="h-px bg-dark-gray my-4" />

          {/* actions row */}
          <div className="mt-3 flex items-center justify-between text-text-gray">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Icon icon={"uil:comment-lines"} />
                <span>{data?.Comment_count}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button className="p-1 rounded-full hover:bg-dark-gray duration-150 transition-all" onClick={()=> {handleLike(); fetchData();}} type="button">
                  <Icon icon={data?.liked ? "material-symbols:favorite-rounded":"material-symbols:favorite-outline-rounded"} />  
                </button>
                <span>{data?.Likes}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button className="p-1 rounded-full hover:bg-dark-gray duration-150 transition-all" onClick={()=>{handleSave(); fetchData();}} type="button">
                <Icon icon={data?.saved ?"material-symbols-light:bookmarks" : "material-symbols-light:bookmarks-outline"} />  
                </button>
                <span>{data?.Saves}</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-dark-gray my-4" />

          <div className="mt-4">
            <div className="flex items-center gap-3 border-2 border-dark-gray py-2 px-4 rounded-xl">
              {sessionData ? (
                <img
                  src={baseUrl + sessionData?.profile_picture}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />  
              ):(
                <div className="bg-dark-gray size-10 rounded-full animate-pulse"></div>
              )}

              <fetcher.Form method="post">
                <input
                  name="comment"
                  type="text"
                  placeholder="Post your reply"
                  value={commentValue}
                  onChange={(e)=>setCommentValue(e.target.value)}
                  className="flex-1 w-full rounded-full px-3 py-2 text-sm outline-none focus:ring-0"
                />
              </fetcher.Form>

            </div>
          </div>

          {/* separator */}
          <div className="h-px bg-dark-gray my-4" />

          {/* comments list - COMMENT AJA, sesuai permintaan */}
          <div className="space-y-4">
            {data?.post?.comments?.map((c) => (
              <Comment
                id={c.id}
                repUserId={c.user.id}
                profilePicture={c.user.profile_picture}
                username={c.user.username}
                date={c.created_at}
                comment={c.comment}
                profileLink={c.user.username}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}