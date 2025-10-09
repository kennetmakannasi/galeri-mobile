import { Dialog, DialogPanel, TransitionChild } from "@headlessui/react";


export default function BottomDrawer({ isOpen, onClose, drawerContent }) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <TransitionChild
                enter="ease-out duration-150"   
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"     
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            </TransitionChild>

            <div className="fixed inset-0 flex w-screen items-end justify-center">

                <TransitionChild
                    as={DialogPanel} 
                    className="w-full"
                    
                    enter="transition ease-out duration-150 transform" 
                    enterFrom="translate-y-full" 
                    enterTo="translate-y-0"     

                    leave="transition ease-in duration-150 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"  
                >
                    <div className="border-x-2 border-t-2 p-2 rounded-t-lg border-white bg-background-light-black pb-20 w-full z-20">
                        {drawerContent}
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    );
}