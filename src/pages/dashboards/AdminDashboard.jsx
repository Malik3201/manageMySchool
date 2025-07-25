import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { logOut } from "../../redux/authReducer";
import TeacherManagement from "../../modules/teacher/TeacherManagement";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  return (
    <>
      <Button onClick={() => dispatch(logOut())}>Log Out</Button>
      <h1>this is Admin Dashboard</h1>
      <h2>test conflict</h2>

       <button onClick={() =>navigate("/teacher-management")}>teacher TeacherManagement</button>
    </>
  );
};
export default AdminDashboard;
