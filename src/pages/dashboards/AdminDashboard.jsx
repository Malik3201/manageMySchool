import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { logOut } from "../../redux/authReducer";
const AdminDashboard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(logOut())}>Log Out</Button>
      <h1>this is Admin Dashboard</h1>
      <h2>test conflict</h2>
    </>
  );
};
export default AdminDashboard;
