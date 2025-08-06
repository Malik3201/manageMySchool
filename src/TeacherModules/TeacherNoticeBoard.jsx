import { useEffect, useState } from "react";
import NoticeModel from "../modules/NoticeBoard/NoticeModel";
import { FaBell, FaSearch, FaFilter, FaChalkboardTeacher } from "react-icons/fa";

function TeacherNoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetch("/data/notice.json")
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setFilteredNotices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching notices:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = notices;

    if (filterType !== "All") {
      filtered = filtered.filter(notice => notice.type === filterType);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(notice =>
        notice.notice.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotices(filtered);
  }, [notices, searchTerm, filterType]);

  const getTypeStats = () => {
    const stats = {
      All: notices.length,
      Regular: notices.filter(n => n.type === "Regular").length,
      Important: notices.filter(n => n.type === "Important").length,
      Warning: notices.filter(n => n.type === "Warning").length
    };
    return stats;
  };

  const stats = getTypeStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
            <FaBell className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FaChalkboardTeacher className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Notice Board</h1>
          </div>
          <p className="text-gray-600 text-lg">Stay informed with school announcements and updates</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <FaSearch className="w-5 h-5 text-white" />
              <h2 className="text-xl font-semibold text-white">Search & Filter</h2>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FaSearch className="w-4 h-4" />
                <span>Search Notices</span>
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in notice content..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FaFilter className="w-4 h-4" />
                <span>Filter by Type</span>
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="All">🔍 All Types ({stats.All})</option>
                <option value="Regular">📌 Regular ({stats.Regular})</option>
                <option value="Important">⭐ Important ({stats.Important})</option>
                <option value="Warning">⚠️ Warning ({stats.Warning})</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{stats.All}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-emerald-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.Important}</div>
              <div className="text-sm text-emerald-500">Important</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-red-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.Warning}</div>
              <div className="text-sm text-red-500">Warnings</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.Regular}</div>
              <div className="text-sm text-blue-500">Regular</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {searchTerm || filterType !== "All" ? "Filtered Results" : "All Notices"}
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredNotices.length} {filteredNotices.length === 1 ? 'Notice' : 'Notices'}
  </div>
</div>

          {filteredNotices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <FaBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || filterType !== "All" ? "No Matching Notices" : "No Notices Available"}
              </h4>
              <p className="text-gray-500">
                {searchTerm || filterType !== "All" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Check back later for new announcements"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotices.map((notice, index) => (
                <div 
                  key={index} 
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NoticeModel 
                    notice={notice.notice} 
                    date={notice.date} 
                    time={notice.time} 
                    type={notice.type}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherNoticeBoard;