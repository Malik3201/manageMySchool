import { useState } from "react";
import TimetableEditModal from "./TimetableEditModal";
import {
  FaEdit,
  FaClock,
  FaBook,
  FaChalkboardTeacher,
  FaCoffee,
  FaCalendarDay,
  FaDownload,
  FaPrint,
  FaSave,
  FaEye
} from "react-icons/fa";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = ({ classLabel, section, schedule }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(schedule || {});

  const handleSave = (updatedSchedule) => {
    setCurrentSchedule(updatedSchedule);
    setIsModalOpen(false);
  };

  const firstDayWithData = days.find((day) => currentSchedule[day]?.length);
  const periodTime = firstDayWithData
    ? currentSchedule[firstDayWithData].map((p) => p.time)
    : [
        "09:00 - 09:45",
        "09:45 - 10:30",
        "10:30 - 11:15",
        "11:15 - 11:45",
        "11:45 - 12:30",
        "12:30 - 01:15",
        "01:15 - 02:00"
      ];

  const getSubjectColor = (subject) => {
    const colors = {
      'English': 'bg-blue-50 border-blue-200',
      'Mathematics': 'bg-purple-50 border-purple-200',
      'Science': 'bg-green-50 border-green-200',
      'Literature': 'bg-indigo-50 border-indigo-200',
      'Urdu': 'bg-orange-50 border-orange-200',
      'Islamiat': 'bg-teal-50 border-teal-200',
      'Computer Science': 'bg-gray-50 border-gray-200',
      'Break': 'bg-yellow-50 border-yellow-200'
    };
    return colors[subject] || 'bg-gray-50 border-gray-200';
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'English': FaBook,
      'Mathematics': FaBook,
      'Science': FaBook,
      'Literature': FaBook,
      'Urdu': FaBook,
      'Islamiat': FaBook,
      'Computer Science': FaBook,
      'Break': FaCoffee
    };
    return icons[subject] || FaBook;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FaCalendarDay className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Weekly Timetable
      </h2>
              <p className="text-sm text-white text-opacity-90">
                {classLabel} - Section {section}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-base">Edit</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center space-x-2">
              <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-sm">Export</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center space-x-2">
              <FaPrint className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-sm">Print</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TimetableEditModal
          setIsModalOpen={setIsModalOpen}
          schedule={currentSchedule}
          onSave={handleSave}
        />
      )}

      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm border border-gray-200 rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                      <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4 text-red-500" />
                        <span>Time</span>
                      </div>
                    </th>
              {days.map((day) => (
                      <th key={day} className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]">
                        <div className="flex items-center justify-center space-x-2">
                          <FaCalendarDay className="w-4 h-4 text-red-500" />
                          <span>{day}</span>
                        </div>
                </th>
              ))}
            </tr>
          </thead>
                <tbody className="bg-white divide-y divide-gray-200">
            {periodTime.map((time, periodIndex) => (
                    <tr key={time} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">{time}</span>
                        </div>
                      </td>
                {days.map((day) => {
                  const daySchedule = currentSchedule[day] || [];
                  const period = daySchedule[periodIndex] || {
                    subject: "",
                    teacher: "",
                  };
                  const isBreak = period.subject === "Break";
                        const SubjectIcon = getSubjectIcon(period.subject);

                  return (
                          <td key={`${day}-${periodIndex}`} className="px-4 py-4">
                      {isBreak ? (
                              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-lg p-3 text-center">
                                <div className="flex items-center justify-center space-x-2 text-yellow-800">
                                  <FaCoffee className="w-4 h-4" />
                                  <span className="font-semibold text-sm">Break Time</span>
                                </div>
                              </div>
                            ) : period.subject ? (
                              <div className={`${getSubjectColor(period.subject)} border rounded-lg p-3 transition-all duration-200 hover:shadow-md`}>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <SubjectIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                    <span className="font-semibold text-sm text-gray-900 truncate">
                                      {period.subject}
                                    </span>
                                  </div>
                                  {period.teacher && (
                                    <div className="flex items-center space-x-2">
                                      <FaChalkboardTeacher className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                      <span className="text-xs text-gray-600 truncate">
                                        {period.teacher}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                                <span className="text-xs text-gray-400">No Class</span>
                          </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Class Periods</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Break Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Free Period</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
