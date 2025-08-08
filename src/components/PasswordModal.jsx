import { useState } from "react";
import {
  FaKey,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaShieldAlt,
  FaLock
} from "react-icons/fa";

const PasswordModal = ({ changePassHandler, setIsPassModalOpen }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password) => {
    const errors = {};
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (password.length > 50) {
      errors.password = "Password must be less than 50 characters";
    }
    
    return errors;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengths = [
      { strength: 0, label: "Very Weak", color: "bg-red-500" },
      { strength: 1, label: "Weak", color: "bg-orange-500" },
      { strength: 2, label: "Fair", color: "bg-yellow-500" },
      { strength: 3, label: "Good", color: "bg-blue-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" }
    ];

    return strengths[score];
  };

  const handleUpdatePassword = async () => {
    const newPasswordErrors = validatePassword(newPassword);
    
    if (Object.keys(newPasswordErrors).length > 0) {
      setErrors(newPasswordErrors);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
    changePassHandler(newPassword);
    setIsPassModalOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaKey className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change Password</h2>
                <p className="text-sm text-white text-opacity-90">Update your account security</p>
              </div>
            </div>
            <button
              onClick={() => setIsPassModalOpen(false)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200 text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FaShieldAlt className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 text-sm">Password Security Tips</h3>
                <ul className="text-xs text-blue-600 mt-2 space-y-1">
                  <li>• Use at least 8 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaLock className="inline w-3 h-3 mr-1" />
                New Password
              </label>
              <div className="relative">
        <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showNewPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FaExclamationTriangle className="w-3 h-3 mr-1" />
                  {errors.password}
                </p>
              )}
              
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength >= 3 ? 'text-green-600' : 
                      passwordStrength.strength >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCheck className="inline w-3 h-3 mr-1" />
                Confirm New Password
              </label>
              <div className="relative">
        <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.confirm 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FaExclamationTriangle className="w-3 h-3 mr-1" />
                  {errors.confirm}
                </p>
              )}
              {confirmPassword && newPassword === confirmPassword && (
                <p className="mt-1 text-sm text-green-600 flex items-center">
                  <FaCheck className="w-3 h-3 mr-1" />
                  Passwords match
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => setIsPassModalOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
          </button>
          <button
            onClick={handleUpdatePassword}
              disabled={isSubmitting || !newPassword || !confirmPassword}
              className={`flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isSubmitting || !newPassword || !confirmPassword
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <FaKey className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
