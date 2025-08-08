import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaBook,
  FaSpinner,
  FaExclamationCircle,
  FaGraduationCap,
  FaCalendarDay,
  FaUsers,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaLandmark,
  FaAtom,
  FaLeaf,
  FaLanguage,
  FaGlobe
} from "react-icons/fa";

const TeachersTimetable = () => {
  const currentTeacherId = JSON.parse(localStorage.getItem("userId"));
  const [timeTable, setTimeTable] = useState(null);
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [timetableRes, teachersRes] = await Promise.all([
          axios.get("/data/timetable.json"),
          axios.get("/data/teachers.json")
        ]);
        
        setTimeTable(timetableRes.data);
        const currentTeacher = teachersRes.data.find(t => t.id === currentTeacherId);
        setTeacherData(currentTeacher);
      } catch (err) {
        setError("Failed to load timetable data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentTeacherId]);

  useEffect(() => {
    if (!timeTable) return;

    const schedule = [];

    timeTable.forEach((classData) => {
      const className = `${classData.class} ${classData.section}`;
      Object.entries(classData.schedule).forEach(([day, periods]) => {
        periods.forEach((period) => {
          if (period.teacherId == currentTeacherId) {
            schedule.push({
              class: className,
              day: day,
              time: period.time,
              subject: period.subject,
            });
          }
        });
      });
    });

    setTeacherSchedule(schedule);
  }, [timeTable, currentTeacherId]);

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
      'Literature': FaBookOpen
    };
    const IconComponent = icons[subject] || FaBook;
    return <IconComponent className="w-4 h-4" />;
  };

  const getDayIcon = (day) => {
    return <FaCalendarDay className="w-4 h-4 text-blue-500" />;
  };

  const getScheduleStats = () => {
    const totalPeriods = teacherSchedule.length;
    const uniqueDays = [...new Set(teacherSchedule.map(item => item.day))].length;
    const uniqueSubjects = [...new Set(teacherSchedule.map(item => item.subject))].length;
    const uniqueClasses = [...new Set(teacherSchedule.map(item => item.class))].length;
    
    return { totalPeriods, uniqueDays, uniqueSubjects, uniqueClasses };
  };

  const stats = getScheduleStats();

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading your schedule...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Schedule</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 xs:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">My Teaching Schedule</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                Welcome, <span className="font-semibold text-blue-600">{teacherData?.name || "Teacher"}</span> - Your weekly timetable
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 xs:p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Periods</p>
                <p className="text-xl xs:text-2xl font-bold text-blue-800">{stats.totalPeriods}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FaClock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Subjects</p>
                <p className="text-xl xs:text-2xl font-bold text-green-800">{stats.uniqueSubjects}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaBook className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 xs:p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Classes</p>
                <p className="text-xl xs:text-2xl font-bold text-purple-800">{stats.uniqueClasses}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 xs:p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Working Days</p>
                <p className="text-xl xs:text-2xl font-bold text-orange-800">{stats.uniqueDays}</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <FaCalendarDay className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              <div>
                <h2 className="text-lg xs:text-xl font-bold text-white">Weekly Teaching Schedule</h2>
                <p className="text-sm text-white text-opacity-90">Your complete class and subject assignments</p>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6">
        {teacherSchedule.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Classes Assigned</h3>
                <p className="text-gray-500">You don't have any classes assigned to your schedule yet.</p>
              </div>
        ) : (
          <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <th className="text-left p-3 xs:p-4 font-semibold text-gray-700 border-b-2 border-blue-200">
                        <div className="flex items-center space-x-2">
                          <FaCalendarDay className="w-4 h-4 text-blue-600" />
                          <span>Day</span>
                        </div>
                      </th>
                      <th className="text-left p-3 xs:p-4 font-semibold text-gray-700 border-b-2 border-blue-200">
                        <div className="flex items-center space-x-2">
                          <FaClock className="w-4 h-4 text-blue-600" />
                          <span>Time</span>
                        </div>
                      </th>
                      <th className="text-left p-3 xs:p-4 font-semibold text-gray-700 border-b-2 border-blue-200">
                        <div className="flex items-center space-x-2">
                          <FaBook className="w-4 h-4 text-blue-600" />
                          <span>Subject</span>
                        </div>
                      </th>
                      <th className="text-left p-3 xs:p-4 font-semibold text-gray-700 border-b-2 border-blue-200">
                        <div className="flex items-center space-x-2">
                          <FaGraduationCap className="w-4 h-4 text-blue-600" />
                          <span>Class</span>
                        </div>
                      </th>
                </tr>
              </thead>
              <tbody>
                {teacherSchedule.map((item, index) => (
                  <tr
                    key={index}
                        className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100"
                      >
                        <td className="p-3 xs:p-4">
                          <div className="flex items-center space-x-2">
                            {getDayIcon(item.day)}
                            <span className="font-medium text-gray-900">{item.day}</span>
                          </div>
                        </td>
                        <td className="p-3 xs:p-4">
                          <div className="flex items-center space-x-2">
                            <FaClock className="w-3 h-3 text-blue-500" />
                            <span className="text-gray-700">{item.time}</span>
                          </div>
                        </td>
                        <td className="p-3 xs:p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border border-blue-300">
                              {getSubjectIcon(item.subject)}
                            </div>
                            <span className="font-medium text-gray-900">{item.subject}</span>
                          </div>
                        </td>
                        <td className="p-3 xs:p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <FaGraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{item.class}</span>
                          </div>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersTimetable;
