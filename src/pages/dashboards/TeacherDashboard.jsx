import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { logOut } from "../../redux/authReducer";
const TeacherDashboard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={() => dispatch(logOut())}>Log Out</Button>
      <h1>this is Teacher Dashboard</h1>
    </>
  );
};
export default TeacherDashboard;
