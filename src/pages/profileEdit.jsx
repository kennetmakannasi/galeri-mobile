import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { SessionData } from '../components/layout/mainLayout';
import { UseToken } from '../helpers/useToken';
import { Icon } from '@iconify/react/dist/iconify.js';
import toast from 'react-hot-toast';
import BottomDrawer from '../components/bottomDrawer';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { useUrlToFile } from '../helpers/useUrlToFile';

export default function EditProfile() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const data = useContext(SessionData);
  const {
    register, 
    handleSubmit , 
    setValue , 
    watch,
    clearErrors,
    formState: { errors },
  } = useForm()

  setValue("name", data?.name || '...')
  setValue("username", data?.username || '...')
  setValue("bio", data?.bio || '')

  async function onSubmit(data) {
    const payload = {
      name: data.name,
      username: data.username,
      bio: data.bio,
      profile_picture: proPicFile,
      profile_banner: bannerFile
    }

    await toast.promise(
      axios.post(`${baseUrl}/api/users/editus`, payload,{
        headers: {
          Authorization: 
            `Bearer ${UseToken()}`,
            'Content-Type': 'multipart/form-data'
        }
      }),
      {
        loading: 'Saving Changes...',
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

    console.log(payload)
  }

  const [editTargetType, setEditTargetType] = useState(null);

  const [ proPicFile, setProPicFile ] = useState(null);
  const [ proPicSrc , setProPicSrc ] = useState(null);

  // const proBannerImg = watch("profile_banner");
  // const proBannerFile = proBannerImg?  proBannerImg[0] : null
  // const previewProfileBanner = proBannerFile? URL.createObjectURL(proBannerFile) : null

  const [ bannerFile, setBannerFile ] = useState(null);
  const [ bannerSrc , setBannerSrc ] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      clearErrors()
    }, 3000);
  },[errors])

  async function OpenGallery(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if(type == 'banner'){
      setBannerSrc(image.dataUrl)
      const img = useUrlToFile(image.dataUrl, "image.jpg")
      setBannerFile(img);
      setIsOpen(false)
    }
    if(type == 'profile'){
      setProPicSrc(image.dataUrl)
      const img = useUrlToFile(image.dataUrl, "image.jpg")
      setProPicFile(img);
      setIsOpen(false)
    }
  }

  async function OpenCam(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if(type == 'banner'){
      setBannerSrc(image.dataUrl)
      const img = useUrlToFile(image.dataUrl, "image.jpg")
      setBannerFile(img);
      setIsOpen(false)
    }
    if(type == 'profile'){
      setProPicSrc(image.dataUrl)
      const img = useUrlToFile(image.dataUrl, "image.jpg")
      setProPicFile(img);
      setIsOpen(false)
    }
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-12 mb-20"> {/* Hapus bg-gray-900 */}
      <div className="w-full h-full relative mb-22">
        {data?.profile_banner ? (
          <div className='relative h-48 w-full'>
            <button onClick={()=>{
              setIsOpen(true);
              setEditTargetType('banner');
            }} className='inset-0 size-full bg-black/30 absolute rounded-4xl flex items-center justify-center'>
              <div className='bg-black/40 p-3 rounded-full'>
                <Icon icon="mdi:upload" height={40} />  
              </div> 
            </button>
            <img
              src={bannerSrc || baseUrl + data?.profile_banner}
              alt="hero"
              className="w-full h-48 mt-8 object-cover rounded-4xl"
            /> 
          </div>
  
        ):(
          <div className="w-full h-48 mt-8 bg-dark-gray rounded-4xl animate-pulse">
          </div>
        )}
        <div className='absolute -bottom-18 ml-3'>
          <div className="relative">
            {data ? (
              <div className="size-32 rounded-full relative border-4 border-black overflow-hidden">
                <button onClick={()=> {
                  setIsOpen(true);
                  setEditTargetType('profile');
                }} className='inset-0 bg-black/30 size-full absolute flex items-center justify-center'>
                  <div className='bg-black/40 p-3 rounded-full'>
                    <Icon icon="mdi:upload" height={40} />  
                  </div>
                </button>
                <img
                  src={proPicSrc || baseUrl + data?.profile_picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>  
            ):(
              <div className="size-32 rounded-full relative border-4 border-black overflow-hidden bg-dark-gray animate-pulse"></div>
            )}

          </div> 
        </div>
      </div>
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

      <div className="mx-auto w-full h-[2px] bg-bright-yellow mt-6"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-16'>
          <h2 className="text-lg font-medium text-white mb-4 mt-4">Name</h2>
            <div>
              <input
                type="text"
                {...register("name",{required:true})}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
          <div>
            <h2 className="text-lg font-medium text-white my-4">Username</h2>
            <div 
            >
              <input
                type="text"
                {...register("username",{
                  required:true,
                  pattern:{
                    value:  /^[a-zA-Z0-9_-]+$/,
                    message: 'username cannot contain space or special characters',
                  }
                })}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <h2 className="text-lg font-medium text-white mb-4 mt-4">Bio</h2>
            <div>
              <input
                type="text"
                {...register("bio",{
                  required:false,
                  maxLength:{
                    value: 255,
                    message: 'Bio cant be longer than 255 characters'
                  }
                })}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
              {errors.bio && <p>{errors.bio.message}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 text-white bg-dark-gray rounded-lg hover:bg-accent-dark-gray transition-all duration-150"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-dark-gray rounded-lg hover:bg-accent-dark-gray transition-all duration-150"
            >
              Save changes
            </button>
          </div>
      </div>
      </form>
      <BottomDrawer isOpen={isOpen} onClose={()=>setIsOpen(false)} drawerContent={
        <div className="flex flex-col gap-3">
          <button
            onClick={()=>OpenGallery(editTargetType)}
          type="button"
          className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
          >
          Open Gallery
          </button>
          <button
          onClick={()=>OpenCam(editTargetType)}
          type="button"
          className="text-left px-3 py-2 hover:bg-accent-dark-gray duration-150 transition-all rounded"
          >
          Open Camera
          </button>
        </div>
      }/>
    </div>
  );
};
