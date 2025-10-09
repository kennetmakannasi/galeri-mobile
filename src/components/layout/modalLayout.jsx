import { Dialog, DialogPanel } from "@headlessui/react";

export default function ModalLayout({open, onClose, content}){
    return(
        <Dialog open={open} as="div" className="fixed z-60 inset-0 flex size-full justify-center items-center bg-black/50" onClose={onClose}>
            <div className="size-full flex justify-center items-center px-4">
                <DialogPanel transition className="bg-dark-gray rounded-xl flex items-center justify-center duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                    <div className="w-full p-5">
                        {content}
                    </div>
                </DialogPanel>
            </div>
        </Dialog> 
    )
}