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


const TeacherDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="flex-1 flex flex-col">
          <div className="p-6 overflow-auto">
            <button
              className={`${showSidebar ? "hidden" : "block"} md:hidden`}
              onClick={() => setShowSidebar(true)}
            >
              <GiHamburgerMenu />
            </button>
            <Routes>
              <Route index element={<Navigate to="notice-board" replace />} />
              <Route path="notice-board" element={<TeacherNoticeBoard />} />
              <Route path="reports" element={<CreateReport />} />
              <Route path="time-table" element={<TeachersTimetable />} />
              <Route path="settings" element={<Settings />} />
              <Route path="classes" element={<ClassAttendance />} />
              <Route path="exams" element={<TeacherExam />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
