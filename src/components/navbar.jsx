import { Icon } from "@iconify/react/dist/iconify.js"
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router"
import Cookies from "js-cookie";
import { UseToken, api } from "../helpers/api";
import axios from "axios";
import UploadModal from "./AddPost";
import { SessionData } from "./layout/mainLayout";
import toast from "react-hot-toast";
import BottomDrawer from "../components/bottomDrawer";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { useUrlToFile } from "../helpers/useUrlToFile";

export default function Navbar(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const path = location.pathname;
    const sessionData = useContext(SessionData);
    const navigate = useNavigate()
    const [src, setSrc] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');

    async function handleLogOut(){
        await toast.promise(
            api.get(`/api/auth/logout`,{
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

    async function OpenGallery() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos
        });

        setSrc(image.dataUrl)
        const img = useUrlToFile(image.dataUrl, "image.jpg")
        setFile(img);
    }

    async function OpenCam() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });

        setSrc(image.dataUrl)
        const img = useUrlToFile(image.dataUrl, "image.jpg")
        setFile(img);
    }


    useEffect(()=>{
        setIsOpen(false)
        if(src !== ''){
            setModal(true)
        }
    },[src])

    return(
        <>
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
                {/* <UploadModal/> */}
                <button
            onClick={() => setIsOpen(true)}
            className="flex w-full items-center justify-center"
            >
        <Icon height={20} icon={'basil:add-outline'}/>
        </button>
            </li>
            <li className="my-5 w-full">
                <Link className={`flex w-full items-center justify-center ${path === `/profile/${sessionData?.username}` ? 'text-bright-yellow':''}`} to={`/profile/${sessionData?.username}`}>
                    <Icon height={22} icon={'iconamoon:profile-circle-fill'}/>
                </Link>
            </li>
        </ul>
    </div>
    <BottomDrawer isOpen={isOpen} onClose={()=>setIsOpen(false)} drawerContent={
                <div className="flex flex-col gap-3">
                    <button
                    onClick={OpenGallery}
                  type="button"
                  className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                  >
                  Open Gallery
                  </button>
                  <button
                  onClick={OpenCam}
                  type="button"
                  className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
                  >
                  Open Camera
                  </button>
                </div>
            }/>
            <UploadModal 
                isOpen={modal} 
                onClose={()=>setModal(false)}
                previewImg={src}
                img={file}
            />
            </>
        
    )
}