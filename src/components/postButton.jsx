import { Icon } from "@iconify/react/dist/iconify.js"

export default function PostButton({icon, text}){
    return(
        <div className="flex items-center text-text-gray w-full m-4">
            <Icon height={20} icon={icon}/>
            <p className="ml-3">{text}</p>
        </div>
    )
}