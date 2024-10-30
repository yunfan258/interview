export const TabItem = ({title,content}:
    {title:string,content:string}
)=>{
    return(
        <div className="p-5 flex-col w-[200px] text-left">
            <div className="pb-3 text-lg">{title}</div>
            <div className="text-wrap">{content}</div>
        </div>
    )
}