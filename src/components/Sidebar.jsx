import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authReducer";
import Button from "./Button";
const Sidebar = () => {
  const dispatch = useDispatch();
  const links = [
    { name: "Notice Board", path: "/admin-dashboard/notice-board" },
    { name: "Students", path: "/admin-dashboard/students" },
    { name: "Teachers", path: "/admin-dashboard/teachers" },
    { name: "Classes", path: "/admin-dashboard/classes" },
    { name: "Attendance", path: "/admin-dashboard/attendance" },
    { name: "Exams", path: "/admin-dashboard/exams" },
    { name: "Fees", path: "/admin-dashboard/fees" },
    { name: "Reports", path: "/admin-dashboard/reports" },
  ];
  return (
    <>
      <div className=" w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
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
