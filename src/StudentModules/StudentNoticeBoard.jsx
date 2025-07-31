import { useEffect, useState } from "react"
import NoticeModel from "../modules/NoticeBoard/NoticeModel"

function StudentNoticeBoard(){
    const [notices,setNotices] = useState([])

    useEffect(()=>{
     fetch("/data/notice.json")
     .then(res=>res.json())
     .then(data=>setNotices(data))
    },[])
return(
    <>
    <div className="p-6 bg-white rounded-3xl shadow-md border border-gray-200 max-w-6xl mx-auto mt-6 space-y-4">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notices</h2>
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
      notices.map(notice => (
        <div
          className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
        >
          <NoticeModel notice={notice.notice} date={notice.date} time={notice.time} type={notice.type}
          />
        </div>
      ))
    }
  </div>
</div>

    
    </>
)
}export default StudentNoticeBoard