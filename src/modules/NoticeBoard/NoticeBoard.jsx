import { useEffect, useState } from "react";
import NoticeModel from "./NoticeModel";

function NoticeBoard() {
  const [notice, setNotice] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [noticeTime, setNoticeTime] = useState("");
  const [noticeData, setNoticeData] = useState([]);
  const [noticeType, setNoticeType] = useState("Regular")

  function handleSubmit() {
    if (!notice || !noticeDate || !noticeTime) return;

    const newNotice = {
      id: Date.now(),
      notice,
      date: noticeDate,
      time: noticeTime,
      type: noticeType
    };

    setNoticeData((prev) => [...prev, newNotice]);

    
    setNotice("");
    setNoticeDate("");
    setNoticeTime("");
  }

  function handleDelete(id) {
    const filteredNotices = noticeData.filter((n) => n.id !== id);
    setNoticeData(filteredNotices);
  }

  useEffect(()=>{
   console.log(noticeData);
   
  },[noticeData])

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Create Notice</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="Enter your notice"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="date"
            value={noticeDate}
            onChange={(e) => setNoticeDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="time"
            value={noticeTime}
            onChange={(e) => setNoticeTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          
          <select
          value={noticeType}
          onChange={(e) => setNoticeType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Regular">Regular</option>
          <option value="Important">Important</option>
          <option value="Warning">Warning</option>
        </select>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Submit Notice
          </button>
        </div>
      </div>

  
      <div className="max-w-md mx-auto mt-6 space-y-4">
        {noticeData.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-blue-50 border border-blue-200 rounded-2xl shadow flex justify-between items-center"
          >
            <NoticeModel notice={item.notice} date={item.date} time={item.time} type={item.type}/>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default NoticeBoard;
