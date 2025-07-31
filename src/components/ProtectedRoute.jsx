import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userRole } = useSelector((state) => state.authReducer);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
