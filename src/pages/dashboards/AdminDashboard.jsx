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

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 w-64 bg-white shadow-lg h-screen overflow-y-auto transition-transform duration-300 z-20`}
      >
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>


      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 overflow-auto flex-1">

          <button
            className={`${showSidebar ? "hidden" : "block"} md:hidden mb-4`}
            onClick={() => setShowSidebar(true)}
          >
            <GiHamburgerMenu size={24} />
          </button>

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
              path="attendance/teacher-Attendance"
              element={<TeacherAttendance />}
            />

            <Route path="exams" element={<ExamsManagement />} />
            <Route path="fees" element={<FeesManagement />} />

            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="time-table" element={<TimeTableSection />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-10"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
