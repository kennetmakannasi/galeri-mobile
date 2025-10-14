import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { UseToken } from "../helpers/useToken";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadModal({isOpen, onClose, previewImg, img}) {
  const {
    register, 
    handleSubmit, 
    watch,
    clearErrors,
    formState: { errors },
  }= useForm();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  async function onSubmit(data) { 
    try{
      const payload = {
        "title": data.title,
        "description": data.description,
        "image_url": img
      }

      const res = await toast.promise(
        axios.post(`${baseUrl}/api/post`, payload,
          {
            headers: {
              Authorization: `Bearer ${UseToken()}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        ),
        {
          loading: 'Posting...',
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
      console.log(payload)
      navigate(0)
    }catch(error){
      console.error(error)
      const status = error.response.status;

      if(status === 422){
        toast.error('Image size too big, the maximum size is 2MB',{
          style:{
            borderRadius: '10px',
            background: '#2E2E2E',
            color: '#fff',
          }
        })
      }else{
        toast.error('Failed to make Post',{
          style:{
            borderRadius: '10px',
            background: '#2E2E2E',
            color: '#fff',
          }
        })
      }
    }
    
  }
  
  useEffect(()=>{
    if(errors){
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
  },[errors])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 px-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-dark-gray p-6 rounded-2xl w-[700px] flex gap-6 text-white">
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" method="post" onSubmit={handleSubmit(onSubmit)}>
                  {/* Upload Box */}
                  <div className="bg-light-gray rounded-2xl p-6 flex flex-col relative items-center justify-center w-full">
                    {previewImg ? (
                      <>
                      <div className="max-h-80 overflow-y-auto">
                        <img className="w-full object-cover" src={previewImg || 'no'} alt="" />  
                      </div>  
                      </>

                    ):(
                    
                      <>
                      <Icon icon="mdi:upload" className="text-4xl mb-3" />
                      <p className="text-center text-lg mb-2">
                        Select a file or drag <br /> and drop it here
                      </p>   
                      <p className="text-xs text-gray-400 text-center mt-3">
                        It is recommended to use high-quality .jpg files less than 20 MB
                        in size or .mp4 files less than 200 MB in size.
                      </p>
                      <div className="border-b border-gray-600 my-4 w-full"></div> 
                      </>
                    )}
                  </div>

                  {/* Input Title & Caption */}
                  <div className="bg-light-gray rounded-2xl p-6 flex flex-col gap-4 w-full">
                    <div>
                      <label className="block text-sm text-gray-400">Title</label>
                      <input
                        type="text"
                        {...register("title",{
                          required: 'title is required',
                          maxLength:{
                            value: 255,
                            message: 'Title cant be longer than 255 characters'
                          }
                        })}
                        placeholder="Add Title"
                        className="w-full px-3 py-2 rounded-md bg-dark-gray text-white focus:outline-none"
                      />
                      {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Caption</label>
                      <textarea
                        {...register("description",{
                          maxLength:{
                            value: 255,
                            message: 'Description cant be longer than 255 characters'
                          }
                        })}
                        placeholder="Add caption"
                        className="w-full px-3 py-2 rounded-md bg-dark-gray text-white focus:outline-none"
                      ></textarea>
                      {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div>
                      <button type="submit" className="bg-dark-gray hover:bg-accent-dark-gray w-full py-2 rounded-md transition-all duration-150">
                      Post
                    </button>
                    </div>
                  </div>  
                </form>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
