import Sidebar from "../../components/Sidebar";
import NoticeBoard from "../../modules/NoticeBoard/NoticeBoard";
import Reports from "../Reports";
import { Route, Routes } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import { Navigate } from "react-router-dom";
import StudentManagement from "../../modules/students/StudentManagemant";
import TimeTableSection from "../TimeTableSection";
import TeacherAttendance from "../../modules/Attendance/TeacherAttendance";
// import StudentAttendance from "../../StudentModules/ViewStudentAttendance";
import FeesManagement from "../../modules/Fees/FeesManagement";
import ExamsManagement from "../../modules/Exams/ExamsManagement";

import Settings from "../Settings";
import StudentNoticeBoard from "../../StudentModules/StudentNoticeBoard";
import StudentExams from "../../StudentModules/StudentExams";
import ViewStudentAttendance from "../../StudentModules/ViewStudentAttendance";
const StudentDashboard = () => {
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
                element={<ViewStudentAttendance />}
              />
              <Route
                path="attendance/teacher-Attendance"
                element={<TeacherAttendance />}
              />

              <Route path="exams" element={<StudentExams />} />
              <Route path="fees" element={<FeesManagement />} />

              <Route path="notice-board" element={<StudentNoticeBoard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="time-table" element={<TimeTableSection />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
