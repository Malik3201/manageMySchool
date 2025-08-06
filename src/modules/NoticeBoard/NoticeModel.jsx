import { FaBell, FaExclamationTriangle, FaInfoCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

function NoticeModel({ notice, date, time, type }) {
  const getNoticeConfig = () => {
    switch (type) {
      case "Important":
        return {
          bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
          borderColor: "border-emerald-300",
          badgeColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
          textColor: "text-emerald-800",
          icon: <FaExclamationTriangle className="w-4 h-4" />,
          label: "Important",
          shadowColor: "shadow-emerald-100"
        };
      case "Warning":
        return {
          bgColor: "bg-gradient-to-br from-red-50 to-red-100",
          borderColor: "border-red-300",
          badgeColor: "bg-gradient-to-r from-red-500 to-red-600",
          textColor: "text-red-800",
          icon: <FaExclamationTriangle className="w-4 h-4" />,
          label: "Warning",
          shadowColor: "shadow-red-100"
        };
      default:
        return {
          bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
          borderColor: "border-blue-300",
          badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
          textColor: "text-blue-800",
          icon: <FaInfoCircle className="w-4 h-4" />,
          label: "Notice",
          shadowColor: "shadow-blue-100"
        };
    }
  };

  const config = getNoticeConfig();

  return (
    <div className={`
      relative p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 
      hover:shadow-xl hover:scale-[1.02] transform group
      ${config.bgColor} ${config.borderColor} ${config.shadowColor}
    `}>
      <div className={`
        absolute -top-3 -right-3 px-3 py-2 rounded-full shadow-lg
        flex items-center space-x-2 transition-transform duration-200
        group-hover:scale-110 ${config.badgeColor}
      `}>
        <span className="text-white">
          {config.icon}
        </span>
        <span className="text-xs font-bold text-white uppercase tracking-wide">
          {config.label}
        </span>
      </div>

      <div className="mb-4">
        <p className={`
          text-lg font-semibold leading-relaxed break-words
          ${config.textColor}
        `}>
          {notice}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-gray-600">
          <FaCalendarAlt className="w-4 h-4" />
          <span className="text-sm font-medium">{date}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <FaClock className="w-4 h-4" />
          <span className="text-sm font-medium">{time}</span>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white opacity-20"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-white opacity-10"></div>
    </div>
  );
}

export default NoticeModel;