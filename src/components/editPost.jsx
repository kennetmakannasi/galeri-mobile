import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseToken } from "../helpers/useToken";
import { useNavigate } from "react-router";
import ModalLayout from "./layout/modalLayout";
import toast from "react-hot-toast";

export default function EditPost({open, onClose, postId}){
    const [data, setData] = useState()
    const navigate = useNavigate()
    const baseUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    setValue("title", data?.post?.title || 'loading...')
    setValue("description", data?.post?.description || 'loading...')

    async function fetchPostData() {
        const res = await axios.get(`${baseUrl}/api/post/${postId}`,{
            headers: {
          Authorization: `Bearer ${UseToken()}`
        }
        })
        setData(res.data.content)
    }

    useEffect(()=>{
        fetchPostData()
    },[])

    async function onSubmit(data) {
        const res = await toast.promise(
            axios.put(`${baseUrl}/api/post/${postId}`,{
                title: data.title,
                description: data.description
            },{
                headers: {
                    Authorization: `Bearer ${UseToken()}`
                }
            }),
            {
                loading: 'Editing...',
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

        navigate(0)
    }

    return(
        <ModalLayout open={open} onClose={onClose} content={
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div>
                    <label className="block text-sm text-gray-400">Title</label>
                    <input className="w-96 px-3 py-2 rounded-md bg-light-gray text-white focus:outline-none" type="text" {...register("title")} />    
                </div>
                <div className="mt-3">
                    <label className="block text-sm text-gray-400">Caption</label>
                    <input className="w-96 px-3 py-2 rounded-md bg-light-gray text-white focus:outline-none" type="text" {...register("description")} />    
                </div>
                <button className="w-full px-3 py-2 rounded-md bg-light-gray mt-10 hover:bg-accent-light-gray duration-150 transition-all" type="submit">submit</button>
            </form>    
        }/>
    )

}