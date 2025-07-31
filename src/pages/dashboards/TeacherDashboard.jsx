import Sidebar from "../../components/Sidebar";
import Reports from "../Reports";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import TeachersTimetable from "../TeachersTimetable";
import Settings from "../Settings";
import TeacherNoticeBoard from "../../TeacherModules/TeacherNoticeBoard";
import TeacherExam from "../../TeacherModules/TeacherExam";
import ClassAttendance from "../../TeacherModules/ClassAttendance";

const TeacherDashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-6 overflow-auto">
            <Routes>
              <Route index element={<Navigate to="notice-board" replace />} /> 
              <Route path="notice-board" element={<TeacherNoticeBoard />} />
               <Route path="classes" element={<ClassAttendance />} />
               <Route path="exams" element={<TeacherExam />} />
                <Route path="reports" element={<Reports />} />
               <Route path="time-table" element={<TeachersTimetable />} />
               <Route path="settings" element={<Settings />} />   
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
