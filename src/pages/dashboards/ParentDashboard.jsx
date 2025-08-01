import Sidebar from "../../components/Sidebar";
import NoticeBoard from "../../modules/NoticeBoard/NoticeBoard";
import { Route, Routes } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import { Navigate } from "react-router-dom";
import StudentManagement from "../../modules/students/StudentManagemant";
import TeacherAttendance from "../../modules/Attendance/TeacherAttendance";
import StudentAttendance from "../../modules/Attendance/StudentAttendance";
import ExamsManagement from "../../modules/Exams/ExamsManagement";

import Settings from "../Settings";
import ChildFees from "../../ParentModule/ChildFees";
import ParentReport from "../ParentReport";
import ParentTimetable from "../ParentTimeTable";
const ParentDashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-6 overflow-auto">
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
              <Route path="fees" element={<ChildFees />} />

              <Route path="notice-board" element={<NoticeBoard />} />
              <Route path="reports" element={<ParentReport />} />
              <Route path="time-table" element={<ParentTimetable />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;
