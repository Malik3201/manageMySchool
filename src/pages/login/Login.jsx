import { useForm } from "react-hook-form";
import { fetchUsers } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userRole } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isLoggedIn) {
      switch (userRole) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "student":
          navigate("/student-dashboard");
          break;
        case "teacher":
          navigate("/teacher-dashboard");
          break;
        case "parent":
          navigate("/parent-dashboard");
          break;
        default:
          console.error("Unknown role");
          break;
      }
    }
  }, [isLoggedIn, userRole, navigate]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (credentials) => {
    dispatch(fetchUsers(credentials));
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};
export default Login;
