import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ParentTimeTable from "../ParentTimeTable";
import Settings from "../Settings";
import ChildrenAttendance from "../../ParentModule/ChildrenAttendance";
import ParentReport from "../ParentReport";
import ChildFees from "../../ParentModule/ChildFees";
import ParentNoticeBoard from "../../ParentModule/ParentNoticeBoard";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell, FaUser } from "react-icons/fa";

const ParentDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 w-64 h-screen transition-transform duration-300 z-20`}
      >
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200"
              onClick={() => setShowSidebar(true)}
            >
              <GiHamburgerMenu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <FaBell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser size={14} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-2 sm:p-4 lg:p-6">
            <Routes>
              <Route index element={<Navigate to="notice-board" replace />} />
              <Route path="notice-board" element={<ParentNoticeBoard />} />
              <Route path="fees" element={<ChildFees />} />
              <Route path="attendance/children-attendance" element={<ChildrenAttendance />} />
              <Route path="reports" element={<ParentReport />} />
              <Route path="time-table" element={<ParentTimeTable />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
