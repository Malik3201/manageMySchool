import { useForm } from "react-hook-form";
import { fetchUsers } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaShieldAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaHome,
  FaExclamationCircle,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userRole, errors, loading } = useSelector(
    (state) => state.authReducer
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(false);
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
    setIsSubmitting(true);
    setLoginError("");
    dispatch(fetchUsers(credentials));
  };

  const roleCards = [
    {
      role: "admin",
      title: "Administrator",
      icon: FaShieldAlt,
      color: "from-red-500 to-red-600",
      description: "Full system access and management"
    },
    {
      role: "teacher",
      title: "Teacher",
      icon: FaChalkboardTeacher,
      color: "from-blue-500 to-blue-600",
      description: "Classroom and student management"
    },
    {
      role: "student",
      title: "Student",
      icon: FaUserGraduate,
      color: "from-green-500 to-green-600",
      description: "Access courses and assignments"
    },
    {
      role: "parent",
      title: "Parent",
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
      description: "Monitor child's progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ManageMySchool</h1>
                <p className="text-gray-600">Smart Campus Management Portal</p>
              </div>
        </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back to Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Digital Campus
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Access your personalized dashboard and manage your educational journey with our comprehensive school management system.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Choose Your Role</h3>
            <div className="grid grid-cols-2 gap-4">
              {roleCards.map((card, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{card.title}</h4>
                      <p className="text-xs text-gray-600 leading-tight">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-green-600">
              <FaCheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Secure Authentication</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <FaCheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Real-time Data Access</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <FaCheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Mobile Responsive Design</span>
            </div>
          </div>
        </div>

                <div className="w-full max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6 sm:space-y-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div className="lg:hidden space-y-1 sm:space-y-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ManageMySchool</h1>
                <p className="text-sm sm:text-base text-gray-600">Smart Campus Portal</p>
              </div>
              
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-sm sm:text-base text-gray-600">Sign in to your account to continue</p>
              </div>
        </div>

        {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <FaExclamationCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">Login Failed</p>
                  <p className="text-sm text-red-700">{loginError}</p>
                </div>
          </div>
        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                  <FaUser className="inline w-3 h-3 mr-1 sm:mr-2" />
                  Email Address
            </label>
                <div className="relative">
            <input
              type="email"
                    placeholder="Enter your email address"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base border rounded-lg shadow-sm bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                      formErrors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                  />
                  <FaUser className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
            {formErrors.email && (
                  <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                    <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{formErrors.email.message}</span>
                  </p>
            )}
          </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                  <FaLock className="inline w-3 h-3 mr-1 sm:mr-2" />
              Password
            </label>
                <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base border rounded-lg shadow-sm bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                      formErrors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  <FaLock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
            >
                    {showPassword ? <FaEyeSlash className="w-3 h-3 sm:w-4 sm:h-4" /> : <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
                </div>
            {formErrors.password && (
                  <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                    <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{formErrors.password.message}</span>
              </p>
            )}
          </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl ${
                  isSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                {isSubmitting || loading ? (
                  <>
                    <FaSpinner className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
        </form>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-center space-y-3">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  <FaHome className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
                
                <p className="text-xs text-gray-400">
                  &copy; {new Date().getFullYear()} ManageMySchool. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            <h3 className="text-center text-base sm:text-lg font-semibold text-gray-900">Select Your Role</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {roleCards.map((card, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-2 sm:p-3 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
                    <card.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">{card.title}</h4>
                  <p className="text-xs text-gray-600 leading-tight mt-1 hidden xs:block">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
