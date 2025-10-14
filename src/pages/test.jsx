import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import BottomDrawer from "../components/bottomDrawer";

export default function TestCam(){
    const [src, setSrc] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);

    async function OpenGallery() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos
        });

        setSrc(image.dataUrl)
    }

    async function OpenCam() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });

        setSrc(image.dataUrl)
    }

    useEffect(()=>{
        setIsOpen(false)
        if(src !== ''){
            setModal(true)
        }
    },[src])

    return(
        <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex w-full items-center justify-center"
            >
        <Icon height={20} icon={'basil:add-outline'}/>
        </button>
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
        </>
    )
}