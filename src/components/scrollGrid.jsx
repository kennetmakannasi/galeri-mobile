import { useEffect, useState } from "react";
import Masonry from "react-layout-masonry";
import { Link } from "react-router";
import axios from "axios";
import PostSkeleton from "./postSkeleton";
import { UseToken } from "../helpers/api";
import { useInView } from "react-intersection-observer";
import { api } from "../helpers/api";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ScrollGrid({endpoint, searchQuery}) {
  const [data, setData] = useState();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(false);
  const [error, setError] = useState(false);

  async function fetchData() {
    try{
      const res = await api.get(`/api/${endpoint}?page=${page}${searchQuery ? `&q=${searchQuery}`:''}`,{
        headers: {
          Authorization: `Bearer ${UseToken()}`
        }
      })

      if(page === 1){
        setData(res.data.content.data)
        setNextPage(res.data.content.last_page)
        setLoading(false)
      } 
      else{
        setData(prevDatas => prevDatas.concat(res.data.content.data))
        setLoading(false)
      }
    }catch(error){
      setError(true)
    }
  
  }

  console.log(data)

  useEffect(()=>{
    fetchData()
  },[page])

//   useEffect(()=>{
//    const timer = setTimeout(() => {
//      setTest(false)
//    }, 2000);

//    return ()=> clearTimeout(timer);
//   },[])

  if(inView){
    if(nextPage != 1){
      setTimeout(() => {
        console.log("inview akaka") 
        setPage(page+1)
        setLoading(true)
      }, 50);
    }
  }

  return (
    <div>
      {error ? (
        <div className="h-screen flex flex-col justify-center items-center text-center"> 
          {endpoint === 'post/search' ? (
            <>
              <Icon className="scale-x-[-1]" icon={'lucide:search-x'} height={80}/>
              <div className="mt-2">
                <p className="text-xl font-bold">Search Failed</p>
                <p className="text-text-gray">No results found for **{searchQuery}**.</p>
              </div>
            </>

          ):(
            <>
              <Icon icon={'streamline-ultimate:smiley-wrong-bold'} height={80}/>
              <div className="mt-2">
                <p className="text-xl font-bold">Something Went Wrong</p>
                <p className="text-text-gray">There was an issue loading the data. Please try again later.</p>
              </div>
            </>

          )}
        </div>
      ):(
        data?.length === 0 ? (
          <div className="h-screen flex flex-col justify-center items-center text-center"> 
            <Icon icon={'fluent:content-view-16-regular'} height={80}/>
            <p className="text-xl font-bold">No Content Yet</p>
            <p className="text-gray-500">{endpoint === 'save'? 'You haven\'t saved any posts yet.' : 'You haven\'t posted anything yet.'}</p>
          </div>
        ):(
        <Masonry columns={{ 640: 2, 1024: 3, 1440: 4 }} gap={17}>
        {data?.map((item, idx) => (
          <Link to={`/post/${endpoint === 'save' ? item.post.id: item.id}`}>
            <div key={idx} className="mb-3 break-inside-avoid rounded-xl overflow-hidden size-full relative">
              <div className="bg-black opacity-0 hover:opacity-30 inset-0 size-full absolute transition-all duration-150">
              </div>
              <img
                src={endpoint === 'save' ? baseUrl + item.post.image_url: baseUrl + item.image_url}
                alt={`Gallery image ${idx + 1}`}
                className="size-full object-cover"
              />
            </div>
          </Link>
        )) || 
        [...Array(15)].map((item, index)=>(
              <div className={`${index % 2 === 0 ? 'h-80': 'h-56'} w-full bg-dark-gray rounded-xl animate-pulse`}>
              </div>
          ))}
          {loading ? 
            [...Array(10)].map((item, index)=>(
              <div className={`${index % 2 === 0 ? 'h-80': 'h-56'} w-full bg-dark-gray rounded-xl animate-pulse`}>
              </div>
            )) : ''
          }
          {nextPage >= page ? (
          <div className="h-1 w-full" ref={ref}></div>
        ):(
          'no more page'
        )}
        </Masonry> 
        )
      )}
      
    </div>
  );
}