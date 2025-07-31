import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import NotAuthorized from "./components/Unauthorized";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          {" "}
          <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
          <Route path="/parent-dashboard/*" element={<ParentDashboard />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </>
  );
}

export default App;
