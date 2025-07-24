import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { logOut } from "../../redux/authReducer";
import TeacherList from "../../modules/teacher/TeacherList";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(logOut())}>Log Out</Button>
      <h1>this is Admin Dashboard</h1>

      <TeacherList/>
    </>
  );
};
export default AdminDashboard;
