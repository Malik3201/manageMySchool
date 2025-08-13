import { useEffect, useState } from "react";
import NoticeModel from "./NoticeModel";

import { FaPlus, FaBell, FaCalendarAlt, FaClock, FaTag, FaTrashAlt } from "react-icons/fa";


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

  const [noticeType, setNoticeType] = useState("Regular");
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    setIsFormValid(notice.trim() && noticeDate && noticeTime);
  }, [notice, noticeDate, noticeTime]);

  function handleSubmit() {
    if (!isFormValid) return;

    const newNotice = {
      id: Date.now(),
      notice: notice.trim(),

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

    setNoticeType("Regular");
  }

  function handleDelete(id) {
    setNoticeData(prev => prev.filter((n) => n.id !== id));
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Important": return "text-emerald-600";
      case "Warning": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaBell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Notice Board Management</h1>
          </div>
          <p className="text-gray-600 text-lg">Create and manage announcements for your school</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <FaPlus className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">Create New Notice</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FaBell className="w-4 h-4" />
                <span>Notice Content</span>
              </label>
              <textarea
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="Enter your notice content here..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={noticeDate}
                  onChange={(e) => setNoticeDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FaClock className="w-4 h-4" />
                  <span>Time</span>
                </label>
                <input
                  type="time"
                  value={noticeTime}
                  onChange={(e) => setNoticeTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FaTag className="w-4 h-4" />
                <span>Notice Type</span>
              </label>
              <select
                value={noticeType}
                onChange={(e) => setNoticeType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              >
                <option value="Regular">📌 Regular Notice</option>
                <option value="Important">⭐ Important Notice</option>
                <option value="Warning">⚠️ Warning Notice</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${
                isFormValid 
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl" 
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FaPlus className="w-5 h-5" />
                <span>Create Notice</span>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Published Notices</h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {noticeData.length} {noticeData.length === 1 ? 'Notice' : 'Notices'}
            </div>
          </div>

          {noticeData.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <FaBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No Notices Yet</h4>
              <p className="text-gray-500">Create your first notice to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noticeData.map((item) => (
                <div key={item.id} className="relative group">
                  <NoticeModel 
                    notice={item.notice} 
                    date={item.date} 
                    time={item.time} 
                    type={item.type}
                  />
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 left-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110 shadow-lg"
                    title="Delete Notice"
                  >
                    <FaTrashAlt className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoticeBoard;
