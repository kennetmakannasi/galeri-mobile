import { useNavigate, Link } from "react-router";
import axios from "axios"
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Register(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const {
        register, 
        handleSubmit, 
        formState: { errors },
        clearErrors
    }= useForm();
    const navigate = useNavigate()

    async function onSubmit(data) {
        try{
            const res = await toast.promise(
                api.post(`/api/auth/register`, 
                {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password
                } ,{
                    headers:{
                    'Content-Type': 'application/json'
                    }
                },
                ),
                {
                    loading: 'Logging In...',
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
            const token = res.data.content
            Cookies.set('token', token, {expires:7})
            navigate('/')
        }catch(error){
            toast.error("Unknown Error",{
                style:{
                    borderRadius: '10px',
                    background: '#2E2E2E',
                    color: '#fff',
                }
            })
            console.error(error)
        }     
    }

    useEffect(()=>{
        setTimeout(() => {
            clearErrors()
        }, 3000);
    })

    return(
        <div className="mx-10 w-full">
                <h2 className="text-center text-4xl mb-12">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Name</label>
                        </div>
                        <div>
                            <input type="username" {...register("name", { 
                                required: 'Insert Name'
                            })} 
                            name="name" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Username</label>
                        </div>
                        <div>
                            <input type="username" {...register("username", { 
                                required: 'Insert Username',
                                pattern:{
                                    value:  /^[a-zA-Z0-9_-]+$/,
                                    message: 'username cannot contain space or special characters',
                                }
                            })} 
                            name="username" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                            {errors.username && <div>{errors.username.message}</div>} 
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Email address</label>
                        </div>
                        <div>
                            <input type="email" {...register("email", { 
                                required: 'Insert Email'
                            })} 
                            name="email" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm">Password</label>
                        </div>
                        <div>
                            <input type="password" {...register("password", { 
                                required: 'insert password' ,
                                minLength:{
                                    value: 8,
                                    message: 'Minimal password length is 8 characters'
                                }
                            })} 
                            name="password" className="bg-white text-black w-full rounded-2xl p-3"/>    
                            {errors.password && <p>{errors.password.message }</p>}
                        </div>
                        <div>
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl hover:bg-accent-bright-yellow transition-all duration-150" >Submit</button>
                        </div>
                        <div className="flex w-full justify-center items-center mt-16">
                            <p>Allready have an account? <Link className="font-semibold hover:underline" to={'/auth/login'}>Login</Link></p>
                        </div>
                    </form>
        </div>
    )
}