function NoticeModel({notice,date , time , type}){
return(<>
 <div
  className={`relative p-5 rounded-xl shadow-md border 
    ${type === "Important" ? "bg-green-50 border-green-400" : 
      type === "Warning" ? "bg-red-50 border-red-400" : 
      "bg-gray-50 border-gray-300"}
    transition duration-300 ease-in-out`}
>
  
  <span
    className={`absolute -top-3 -right-3 px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm 
      ${type === "Important" ? "bg-green-500 text-white" : 
        type === "Warning" ? "bg-red-500 text-white" : 
        "bg-gray-400 text-white"}
    `}
  >
    {type === "Important" ? "📢 Important" : 
     type === "Warning" ? "⚠️ Warning" : 
     "📌 Notice"}
  </span>

 
  <p className="text-lg font-semibold text-gray-800 mb-2 break-words">
    {notice}
  </p>


  <div className="flex justify-between items-center text-sm text-gray-600">
    <span className="whitespace-nowrap">
      {date}
    </span>
    <span className="whitespace-nowrap">
      {time}
    </span>
  </div>
</div>


</>)
}export default NoticeModel