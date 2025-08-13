import {
  FaCalendarDay,
  FaClock,
  FaBook,
  FaChalkboardTeacher,
  FaCoffee,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaAtom,
  FaLeaf,
  FaLanguage,
  FaFootballBall,
  FaPaintBrush,
  FaMusic,
  FaBookOpen,
  FaExclamationCircle,
  FaMicrophone,
  FaGlobe
} from "react-icons/fa";

const TimetableTable = ({ student, timetable }) => {
  const days = Object.keys(timetable || {});
  const timeSlots = timetable && days.length > 0 ? timetable[days[0]].map(period => period.time) : [];

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-50 text-blue-700 border-blue-200',
      'English': 'bg-purple-50 text-purple-700 border-purple-200',
      'Science': 'bg-green-50 text-green-700 border-green-200',
      'Physics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Chemistry': 'bg-red-50 text-red-700 border-red-200',
      'Biology': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'History': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Geography': 'bg-teal-50 text-teal-700 border-teal-200',
      'Computer Science': 'bg-gray-50 text-gray-700 border-gray-200',
      'Physical Education': 'bg-orange-50 text-orange-700 border-orange-200',
      'Art': 'bg-pink-50 text-pink-700 border-pink-200',
      'Music': 'bg-violet-50 text-violet-700 border-violet-200',
      'Literature': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Assembly': 'bg-slate-50 text-slate-700 border-slate-200',
      'Break': 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };
    return colors[subject] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': FaCalculator,
      'English': FaLanguage,
      'Science': FaFlask,
      'Physics': FaAtom,
      'Chemistry': FaFlask,
      'Biology': FaLeaf,
      'History': FaLandmark,
      'Geography': FaGlobe,
      'Computer Science': FaBook,
      'Physical Education': FaFootballBall,
      'Art': FaPaintBrush,
      'Music': FaMusic,
      'Literature': FaBookOpen,
      'Assembly': FaMicrophone,
      'Break': FaCoffee
    };
    const IconComponent = icons[subject] || FaBookOpen;
    return <IconComponent className="w-3 h-3" />;
  };

  if (days.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 xs:px-6 py-4 xs:py-6">
          <div className="flex items-center space-x-3">
            <FaCalendarDay className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-white">Weekly Schedule</h2>
              <p className="text-sm text-white text-opacity-90">Your complete timetable</p>
            </div>
          </div>
        </div>
        <div className="p-4 xs:p-6">
          <div className="text-center py-12">
            <FaExclamationCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Timetable Available</h3>
            <p className="text-gray-500">Your class timetable has not been created yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 xs:px-6 py-4 xs:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <FaCalendarDay className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-white">Weekly Schedule</h2>
              <p className="text-sm text-white text-opacity-90">Monday to Friday timetable</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-white text-opacity-90">
            <FaClock className="w-4 h-4" />
            <span className="text-sm">{timeSlots.length} periods/day</span>
          </div>
        </div>
      </div>

      <div className="p-4 xs:p-6">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="hidden md:block">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-green-50 to-green-100">
                    <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-green-200 w-32">
                      <div className="flex items-center space-x-2">
                        <FaCalendarDay className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Day</span>
                      </div>
                    </th>
                    {timeSlots.map((timeSlot) => (
                      <th key={timeSlot} className="p-2 text-center font-semibold text-gray-700 border-b-2 border-green-200 min-w-32">
                        <div className="flex flex-col items-center space-y-1">
                          <FaClock className="w-3 h-3 text-green-600" />
                          <span className="text-xs leading-tight">{timeSlot}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="p-3 font-semibold text-gray-700 bg-gradient-to-r from-green-50 to-green-100 border-r-2 border-green-200">
                        <div className="flex items-center space-x-2">
                          <FaCalendarDay className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{day}</span>
                        </div>
                      </td>
                      {timetable[day].map((period, periodIndex) => (
                        <td key={`${day}-${periodIndex}`} className="p-2 border-b border-gray-100">
                          <div className={`rounded-lg p-2 text-center transition-all duration-200 hover:scale-105 border ${getSubjectColor(period.subject)}`}>
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              {getSubjectIcon(period.subject)}
                              <span className="font-semibold text-xs leading-tight">{period.subject}</span>
                            </div>
                            {period.teacher && period.teacher !== "All Teachers" && (
                              <div className="text-xs opacity-80 truncate">
                                {period.teacher}
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
                      <div className="flex items-center space-x-2 text-white">
                        <FaCalendarDay className="w-4 h-4" />
                        <span className="font-bold">{day}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {timetable[day].map((period, index) => (
                          <div key={index} className={`rounded-lg p-3 border ${getSubjectColor(period.subject)}`}>
                            <div className="flex items-center space-x-1 mb-1">
                              {getSubjectIcon(period.subject)}
                              <span className="font-semibold text-xs">{period.subject}</span>
                            </div>
                            <div className="text-xs opacity-70 mb-1">
                              <FaClock className="w-3 h-3 inline mr-1" />
                              {period.time.split(' - ')[0]}
                            </div>
                            {period.teacher && period.teacher !== "All Teachers" && (
                              <div className="text-xs opacity-80 truncate">
                                {period.teacher}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center text-xs">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
              <span>STEM</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 bg-purple-50 border border-purple-200 rounded"></div>
              <span>Languages</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 bg-orange-50 border border-orange-200 rounded"></div>
              <span>Physical</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 bg-pink-50 border border-pink-200 rounded"></div>
              <span>Arts</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Break</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Academic Year 2024 • Updated {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableTable;
