// import { useDispatch } from "react-redux";
// import Button from "../../components/Button";
// import { logOut } from "../../redux/authReducer";
// const TeacherDashboard = () => {
//   const dispatch = useDispatch();
//   return (
//     <>
//       <Button onClick={() => dispatch(logOut())}>Log Out</Button>
//       <h1>this is Teacher Dashboard</h1>
//     </>
//   );
// };
// export default TeacherDashboard;
import Sidebar from "../../components/Sidebar";
import NoticeBoard from "../NoticeBoard";
import Reports from "../Reports";
import { Route, Routes } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import { Navigate } from "react-router-dom";
import StudentManagement from "../../modules/students/StudentManagemant";
import TimeTableSection from "../TimeTableSection";
import TeacherAttendance from "../../modules/Attendance/TeacherAttendance";
import StudentAttendance from "../../modules/Attendance/StudentAttendance";
import FeesManagement from "../../modules/Fees/FeesManagement";
import ExamsManagement from "../../modules/Exams/ExamsManagement";

import Settings from "../Settings";
const TeacherDashboard = () => {
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
              <Route path="fees" element={<FeesManagement />} />

              <Route path="notice-board" element={<NoticeBoard />} />
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

export default TeacherDashboard;
