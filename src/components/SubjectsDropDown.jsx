import { FaBook, FaChevronDown, FaExclamationCircle } from "react-icons/fa";

const SubjectsDropDown = ({ register, errors, name = "subject", defaultValue = "",  required = true, variant = "default" }) => {
  const subjectsList = [
    "English",
    "Literature", 
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "Computer Science",
    "Islamiat",
    "Pakistan Studies",
    "Science",
    "Urdu",
    "History",
    "Geography",
    "Economics",
    "Psychology",
    "Sociology",
    "Philosophy",
    "Art",
    "Music"
  ].sort();

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

  const hasError = errors?.[name];

  return (
    <div className="space-y-2">
      {/* {label && (
        <label className="block text-xs sm:text-sm font-semibold text-gray-700">
          <FaBook className={`inline w-3 h-3 mr-1 sm:mr-2 ${getIconColor()}`} />
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
          } cursor-pointer hover:border-gray-400`}
          {...register(name, { required: required ? "Subject is required" : false })}
          defaultValue={defaultValue}
        >
          <option value="" className="text-gray-500">
            Select Subject
          </option>
          {subjectsList.map((subject, index) => (
            <option key={index} value={subject} className="text-gray-900">
              {subject}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaBook className={`w-4 h-4 ${hasError ? "text-red-400" : getIconColor()}`} />
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaChevronDown className={`w-3 h-3 ${hasError ? "text-red-400" : "text-gray-400"}`} />
        </div>
      </div>

      {hasError && (
        <div className="flex items-center space-x-2 text-red-600 text-xs sm:text-sm">
          <FaExclamationCircle className="w-3 h-3 flex-shrink-0" />
          <span>{errors[name].message}</span>
        </div>
      )}
    </div>
  );
};

export default SubjectsDropDown;
