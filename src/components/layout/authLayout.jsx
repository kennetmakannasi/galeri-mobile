import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function AuthLayout (){
    return(
        <div className="flex md:bg-white overflow-hidden relative">
            <Toaster/>
            <img className="h-screen w-[70%] object-cover hidden md:block" src="../assets/auth-banner.png" alt="" />
            <div className="flex justify-center items-center md:bg-background-light-black md:absolute h-screen w-full md:w-[45%] right-0 p-10 md:rounded-l-3xl">
                <Outlet/>    
            </div>
        </div>
    )
}