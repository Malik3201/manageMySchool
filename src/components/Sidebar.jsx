import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authReducer";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const getUserRole = JSON.parse(localStorage.getItem("userRole"));

  const dispatch = useDispatch();

  const filterPaths = () => {
    switch (getUserRole) {
      case "admin":
        return [
          {
            name: "Notice Board",
            path: `/${getUserRole}-dashboard/notice-board`,
          },
          { name: "Students", path: `/${getUserRole}-dashboard/students` },
          { name: "Teachers", path: `/${getUserRole}-dashboard/teachers` },
          { name: "Classes", path: `/${getUserRole}-dashboard/classes` },
          {
            name: "Student-Attendance",
            path: `/${getUserRole}-dashboard/attendance/student-attendance`,
          },
          {
            name: "Teacher-Attendance",
            path: `/${getUserRole}-dashboard/attendance/teacher-attendance`,
          },
          { name: "Exams", path: `/${getUserRole}-dashboard/exams` },
          { name: "Fees", path: `/${getUserRole}-dashboard/fees` },
          { name: "Reports", path: `/${getUserRole}-dashboard/reports` },
          { name: "Timetable", path: `/${getUserRole}-dashboard/time-table` },
          { name: "Settings", path: `/${getUserRole}-dashboard/settings` },
        ];
      case "teacher":
        return [
          {
            name: "Notice Board",
            path: `/${getUserRole}-dashboard/notice-board`,
          },
          { name: "Classes", path: `/${getUserRole}-dashboard/classes` },
          { name: "Exams", path: `/${getUserRole}-dashboard/exams` },
          { name: "Reports", path: `/${getUserRole}-dashboard/reports` },
          { name: "Timetable", path: `/${getUserRole}-dashboard/time-table` },
          { name: "Settings", path: `/${getUserRole}-dashboard/settings` },
        ];
      case "student":
        return [
          {
            name: "Notice Board",
            path: `/${getUserRole}-dashboard/notice-board`,
          },
          {
            name: "Student-Attendance",
            path: `/${getUserRole}-dashboard/attendance/student-attendance`,
          },
          { name: "Exams", path: `/${getUserRole}-dashboard/exams` },
          { name: "Reports", path: `/${getUserRole}-dashboard/reports` },
          { name: "Timetable", path: `/${getUserRole}-dashboard/time-table` },
          { name: "Settings", path: `/${getUserRole}-dashboard/settings` },
        ];
      case "parent":
        return [
          { name: "Fees", path: `/${getUserRole}-dashboard/fees` },
          {
            name: "Student-Attendance",
            path: `/${getUserRole}-dashboard/attendance/student-attendance`,
          },
          { name: "Reports", path: `/${getUserRole}-dashboard/reports` },
          { name: "Timetable", path: `/${getUserRole}-dashboard/time-table` },
          { name: "Settings", path: `/${getUserRole}-dashboard/settings` },
        ];
      default:
        return [];
    }
  };

  const links = filterPaths();

  const getRoleName = () => {
    switch (getUserRole) {
      case "admin":
        return "Admin";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      case "parent":
        return "Parent";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } min-h-screen absolute md:static md:block w-64 bg-white shadow-md p-4`}
      >
        <div className="md:hidden flex justify-end">
          <button onClick={() => setShowSidebar(false)}>
            <IoCloseCircle />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6">{getRoleName()} Panel</h2>
        <nav className="flex flex-col gap-2 justify-around">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button onClick={() => dispatch(logOut())}>Log Out</Button>
        </nav>
      </div>
    </>
  );
};
export default Sidebar;
