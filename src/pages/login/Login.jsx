import { useForm } from "react-hook-form";
import { fetchUsers } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userRole, errors } = useSelector(
    (state) => state.authReducer
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

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

  useEffect(() => {
    if (errors) {
      setLoginError(errors);
    } else {
      setLoginError("");
    }
  }, [errors]);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = (credentials) => {
    dispatch(fetchUsers(credentials));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 tracking-wide">
            MMS
          </h1>
          <p className="text-gray-500">SmartCampus School Portal</p>
        </div>

        {loginError && (
          <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md text-center">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email.message}</p>
            )}
          </div>

          <div className="space-y-1 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {formErrors.password && (
              <p className="text-sm text-red-500">
                {formErrors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Log In
          </Button>
        </form>

        <p className="text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} MMS School Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
