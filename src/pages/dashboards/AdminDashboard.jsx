import Sidebar from "../../components/Sidebar";
import Teachers from "../Teachers";
import Students from "../Students";
import Classes from "../Classes";
import Attendance from "../Attendence";
import Exams from "../Exams";
import Fees from "../Fees";
import NoticeBoard from "../NoticeBoard";
import Reports from "../Reports";
import { Route, Routes } from "react-router-dom";
import ClassManagement from "../../modules/classes/ClassManagement";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
const AdminDashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-6 overflow-auto">
            <Routes>
              <Route path="students" element={<Students />} />
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
        {/* 
        <h1 className="bg-red-200">This is Admin Dashboard</h1> */}
      </div>
    </>
  );
};

export default AdminDashboard;
