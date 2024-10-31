export const TabItem = ({title,content}:
    {title:string,content:string}
)=>{
    return(
        <div className="px-3 sm:p-5 flex-col sm:w-[200px] text-left">
            <div className="text-lg">{title}</div>
            <div className="pt-3 text-wrap sm:flex hidden">{content}</div>
        </div>
    )
}