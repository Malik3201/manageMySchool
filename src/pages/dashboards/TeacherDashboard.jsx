import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import TeachersTimetable from "../TeachersTimetable";
import Settings from "../Settings";
import TeacherNoticeBoard from "../../TeacherModules/TeacherNoticeBoard";
import TeacherExam from "../../TeacherModules/TeacherExam";
import ClassAttendance from "../../TeacherModules/ClassAttendance";
import CreateReport from "../CreateReport";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell, FaUser } from "react-icons/fa";

const TeacherDashboard = () => {
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className={`${showSidebar ? "hidden" : "block"} md:hidden bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 z-30`}
                onClick={() => setShowSidebar(true)}
              >
                <GiHamburgerMenu size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Manage your classes and students</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <FaBell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUser size={14} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-2 sm:p-4 lg:p-6">
            <Routes>
              <Route index element={<Navigate to="notice-board" replace />} />
              <Route path="notice-board" element={<TeacherNoticeBoard />} />
              <Route path="classes" element={<ClassAttendance />} />
              <Route path="exams" element={<TeacherExam />} />
              <Route path="reports" element={<CreateReport />} />
              <Route path="time-table" element={<TeachersTimetable />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
