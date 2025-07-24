import { useForm } from "react-hook-form";
import { fetchUsers } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  if (isLoggedIn) {
    // navigate("/");
    console.log("login success");
  }
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
