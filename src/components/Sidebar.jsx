import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authReducer";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";
import { 
  FaBell, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaCalendarCheck, 
  FaUserCheck, 
  FaClipboardList, 
  FaDollarSign, 
  FaFileAlt, 
  FaClock, 
  FaCog, 
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaSchool
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const getUserRole = JSON.parse(localStorage.getItem("userRole"));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();

  const getMenuIcon = (name) => {
    const iconMap = {
      "Notice Board": <FaBell className="w-5 h-5" />,
      "Students": <FaGraduationCap className="w-5 h-5" />,
      "Teachers": <FaChalkboardTeacher className="w-5 h-5" />,
      "Classes": <FaSchool className="w-5 h-5" />,
      "Student-Attendance": <FaCalendarCheck className="w-5 h-5" />,
      "Teacher-Attendance": <FaUserCheck className="w-5 h-5" />,
      "Exams": <FaClipboardList className="w-5 h-5" />,
      "Fees": <FaDollarSign className="w-5 h-5" />,
      "Reports": <FaFileAlt className="w-5 h-5" />,
      "Timetable": <FaClock className="w-5 h-5" />,
      "Settings": <FaCog className="w-5 h-5" />,
    };
    return iconMap[name] || <FaHome className="w-5 h-5" />;
  };

  const filterPaths = () => {
    switch (getUserRole) {
      case "admin":
        return [
          { name: "Stats", path: `/${getUserRole}-dashboard/stats` },
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
          { name: "Stats", path: `/${getUserRole}-dashboard/stats` },
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
          { name: "Stats", path: `/${getUserRole}-dashboard/stats` },
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
          { name: "Stats", path: `/${getUserRole}-dashboard/stats` },
          {
            name: "Notice Board",
            path: `/${getUserRole}-dashboard/notice-board`,
          },
          { name: "Fees", path: `/${getUserRole}-dashboard/fees` },
          {
            name: "Children-Attendance",
            path: `/${getUserRole}-dashboard/attendance/children-attendance`,
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

  const getRoleColor = () => {
    switch (getUserRole) {
      case "admin":
        return "from-red-500 to-red-600";
      case "teacher":
        return "from-blue-500 to-blue-600";
      case "student":
        return "from-green-500 to-green-600";
      case "parent":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="relative h-full">
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl relative z-50">
        <div className={`bg-gradient-to-r ${getRoleColor()} p-4 relative overflow-hidden flex-shrink-0`}>
          <button 
            className="absolute top-2 right-2 md:hidden text-white hover:text-gray-200 transition-colors duration-200 z-10"
            onClick={() => setShowSidebar(false)}
          >
            <IoCloseCircle className="w-6 h-6" />
          </button>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white"></div>
          </div>

          <div className="relative z-10 flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FaUserCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{getRoleName()}</h2>
              <p className="text-xs text-white text-opacity-80">Dashboard Panel</p>
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-2 text-white text-opacity-90">
              <FaSchool className="w-4 h-4" />
              <span className="text-sm font-medium">Manage My School</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <nav className="space-y-1">
            {links.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-slate-700 hover:bg-opacity-50 hover:scale-105 transform ${
                    isActive 
                      ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-lg shadow-blue-500/25` 
                      : "text-gray-300 hover:text-white"
                  }`
                }
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                    {getMenuIcon(link.name)}
                  </div>
                  <span className="flex-1 truncate">{link.name}</span>
                  <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700 border-opacity-50 flex-shrink-0">
          <button
            onClick={() => dispatch(logOut())}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 transform hover:shadow-lg"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Log Out</span>
          </button>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">Version 1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
