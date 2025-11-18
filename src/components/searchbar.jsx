import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Icon } from "@iconify/react/dist/iconify.js"
import axios from "axios"
import { UseToken, api } from "../helpers/api"

export default function SearchBar(){
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [notfound, setNotFound] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;
    const location = useLocation()

    function handleSearch(event){
        event.preventDefault()
        navigate(`/search?q=${searchValue}`)
        setSearchValue("")
        navigate(0)
    }

    async function fetchData() {
        if(searchValue){
            try{
                const res = await api.get(`/api/post/search?q=${searchValue}`,{
                    headers: {
                Authorization: `Bearer ${UseToken()}`,
                'Content-Type': 'multipart/form-data'
            }
                })
                setData(res.data.content.data || [])
            }catch(error){
                const status = error.response.status

                if(status === 404){
                    setNotFound(true)
                }
                console.error(error)
            }    
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            fetchData()    
        }, 1000);
        
    }, [searchValue])

    useEffect(()=>{
        setSearchValue("")
    }, [location.pathname])

    useEffect(()=>{
        setNotFound(false)
    }, [searchValue])

    return(
        <>
            <div className="relative h-8 flex items-center w-full">
                <Icon className="absolute ml-3 text-gray-400" height={16} icon={'la:search'}/>
                <form className="h-full" onSubmit={handleSearch}>
                    <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="bg-dark-gray h-full px-9  rounded-lg" type="text" placeholder="Search"/>    
                </form>
            </div>
            {searchValue && (
                notfound === false && (
                    <div className="w-full bg-background-light-black border-2 rounded-lg left-0 border-white shadow-md shadow-white absolute z-10 py-4 px-1">
                        {data?.slice(0,3)?.map((item)=>(
                            <Link to={`/search?q=${item.title}`}>
                                <div className="px-3 py-2 flex h-full items-center rounded-lg hover:bg-dark-gray duration-150 transition-all ">
                                    <Icon className="text-text-gray" height={26} icon={'la:search'}/>
                                    <p className="w-full ml-2">{item.title}</p>    
                                </div>
                            </Link>
                        ))}
                    </div>       
                )
            )}
        </>
  
    )
}