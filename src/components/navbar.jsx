import { Icon } from "@iconify/react/dist/iconify.js"
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"
import Cookies from "js-cookie";
import { UseToken } from "../helpers/useToken";
import axios from "axios";
import UploadModal from "./AddPost";
import { SessionData } from "./layout/mainLayout";
import toast from "react-hot-toast";

export default function Navbar(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const path = location.pathname;
    const sessionData = useContext(SessionData);
    const navigate = useNavigate()

    async function handleLogOut(){
        await toast.promise(
            axios.get(`${baseUrl}/api/auth/logout`,{
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            }),
            {
                loading: 'Logging Out...',
                success: <b>Success!</b>,
            } ,
            {
                loading:{
                    style: {
                        borderRadius: '10px',
                        background: '#2E2E2E',
                        color: '#fff',
                    },
                },
                success:{
                    style:{
                        borderRadius: '10px',
                        background: '#2E2E2E',
                        color: '#fff',
                    }
                },
            }
        )
        Cookies.remove("token")
        Cookies.remove("uId")
        navigate('/auth/login')
    }

    return(
    <div className="w-full bg-background-light-black fixed bottom-0 border-dark-gray border-t-2">
         <ul className="grid grid-cols-6 w-full">
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === '/' ? 'text-bright-yellow':''}`} to={'/'}>
                    <Icon height={22} icon={'iconamoon:home'}/>
                </Link>
            </li>
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === '/explore' ? 'text-bright-yellow':''}`} to={'/explore'}>
                    <Icon height={22} icon={'material-symbols:explore-rounded'}/>
                </Link>
            </li>
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === '/bookmark' ? 'text-bright-yellow':''}`} to={'/bookmark'}>
                    <Icon height={22} icon={'material-symbols-light:bookmarks'}/>
                </Link>
            </li>
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === '/search' ? 'text-bright-yellow':''}`} to={'/search'}>
                    <Icon height={22} icon={'la:search'}/>
                </Link>
            </li>
            <li className="my-5 w-full">
                <UploadModal/>
            </li>
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === `/profile/${sessionData?.username}` ? 'text-bright-yellow':''}`} to={`/profile/${sessionData?.username}`}>
                    <Icon height={22} icon={'iconamoon:profile-circle-fill'}/>
                </Link>
            </li>
        </ul>
    </div>
        
    )
}