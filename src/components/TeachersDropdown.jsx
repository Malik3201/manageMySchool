import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaSpinner, FaChevronDown, FaExclamationCircle } from "react-icons/fa";

const TeachersDropDown = ({ register, errors, index, name = "teacher", defaultValue = "",  required = false, variant = "default" }) => {
  const [teachersList, setTeachersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/data/teachers.json");
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const teachers = await response.json();
        setTeachersList(teachers || []);
      } catch (err) {
        setError("Failed to load teachers");
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const getVariantStyles = () => {
    const baseStyles = "w-full pl-10 pr-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 appearance-none bg-white";
    
    switch (variant) {
      case "admin":
        return `${baseStyles} border-red-300 focus:border-red-500 focus:ring-red-500/20`;
      case "teacher":
        return `${baseStyles} border-blue-300 focus:border-blue-500 focus:ring-blue-500/20`;
      case "student":
        return `${baseStyles} border-green-300 focus:border-green-500 focus:ring-green-500/20`;
      case "parent":
        return `${baseStyles} border-purple-300 focus:border-purple-500 focus:ring-purple-500/20`;
      default:
        return `${baseStyles} border-gray-300 focus:border-blue-500 focus:ring-blue-500/20`;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "admin": return "text-red-500";
      case "teacher": return "text-blue-500";
      case "student": return "text-green-500";
      case "parent": return "text-purple-500";
      default: return "text-gray-500";
    }
  };

  const fieldName = index || name;
  const hasError = errors?.[fieldName];

  return (
    <div className="space-y-2">
      {/* {label && (
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">
          <FaChalkboardTeacher className={`inline w-3 h-3 mr-1 sm:mr-2 ${getIconColor()}`} />
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )} */}
      
      <div className="relative">
        <select
          className={`${getVariantStyles()} ${
            hasError 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50" 
              : ""
          } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}`}
          {...register(fieldName, { required: required ? "Teacher is required" : false })}
          defaultValue={defaultValue}
          disabled={loading}
        >
          <option value="" className="text-gray-500">
            {loading 
              ? "Loading teachers..." 
              : teachersList.length === 0 
                ? "No teachers available" 
                : "Select Teacher"
            }
          </option>
          {teachersList.map((teacher, teacherIndex) => (
            <option key={teacherIndex} value={teacher.name} className="text-gray-900">
              {teacher.name}
              {teacher.subjects && teacher.subjects.length > 0 && (
                ` - ${teacher.subjects.slice(0, 2).join(", ")}${teacher.subjects.length > 2 ? "..." : ""}`
              )}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaChalkboardTeacher className={`w-4 h-4 ${hasError ? "text-red-400" : getIconColor()}`} />
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {loading ? (
            <FaSpinner className="w-4 h-4 text-gray-400 animate-spin" />
          ) : (
            <FaChevronDown className={`w-3 h-3 ${hasError ? "text-red-400" : "text-gray-400"}`} />
          )}
        </div>
      </div>

      {hasError && (
        <div className="flex items-center space-x-2 text-red-600 text-xs sm:text-sm">
          <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
          <span>{errors[fieldName].message}</span>
        </div>
      )}

      {error && !hasError && (
        <div className="flex items-center space-x-2 text-orange-600 text-xs sm:text-sm">
          <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && teachersList.length === 0 && (
        <div className="flex items-center space-x-2 text-yellow-600 text-xs sm:text-sm">
          <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
          <span>No teachers found in the system</span>
        </div>
      )}
    </div>
  );
};

export default TeachersDropDown;
