import Sidebar from "../../components/Sidebar";
import NoticeBoard from "../../modules/NoticeBoard/NoticeBoard";
import Reports from "../Reports";
import { Route, Routes, Navigate } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import StudentManagement from "../../modules/students/StudentManagemant";
import TimeTableSection from "../TimeTableSection";
import TeacherAttendance from "../../modules/Attendance/TeacherAttendance";
import StudentAttendance from "../../modules/Attendance/StudentAttendance";
import FeesManagement from "../../modules/Fees/FeesManagement";
import ExamsManagement from "../../modules/Exams/ExamsManagement";
import Settings from "../Settings";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell, FaUser } from "react-icons/fa";

const AdminDashboard = () => {
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
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Manage your school efficiently</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <FaBell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaUser size={14} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-2 sm:p-4 lg:p-6">
            <Routes>
              <Route index element={<Navigate to="notice-board" replace />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="teachers" element={<TeacherManagement />} />
              <Route path="classes" element={<ClassManagement />} />

              <Route
                path="attendance/student-Attendance"
                element={<StudentAttendance />}
              />
              <Route
                path="attendance/teacher-attendance"
                element={<TeacherAttendance />}
              />
              <Route path="exams" element={<ExamsManagement />} />
              <Route path="fees" element={<FeesManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="time-table" element={<TimeTableSection />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notice-board" element={<NoticeBoard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
