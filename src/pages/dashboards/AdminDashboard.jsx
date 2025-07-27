import Sidebar from "../../components/Sidebar";
import Classes from "../Classes";
import Attendance from "../Attendence";
import Exams from "../Exams";
import Fees from "../Fees";
import NoticeBoard from "../NoticeBoard";
import Reports from "../Reports";
import { Route, Routes } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import { Navigate } from "react-router-dom";
import StudentManagement from "../../modules/students/StudentManagemant";
const AdminDashboard = () => {
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
              <Route path="attendance" element={<Attendance />} />
              <Route path="exams" element={<Exams />} />
              <Route path="fees" element={<Fees />} />
              <Route path="notice-board" element={<NoticeBoard />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
