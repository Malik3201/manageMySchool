import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(
    (state) => state.authReducer?.isLoggedIn || false
  );
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
