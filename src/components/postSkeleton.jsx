export default function PostSkeleton(){
    return(
        [...Array(15)].map((item, index)=>(
            <div className={`${index % 2 === 0 ? 'h-80': 'h-56'} w-full bg-white animate-pulse`}>
            </div>
        ))
    )
}