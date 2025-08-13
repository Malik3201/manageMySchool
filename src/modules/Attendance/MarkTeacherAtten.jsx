import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../../components/Table";
import {
  FaChalkboardTeacher,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaUsers,
  FaCalendarAlt,
  FaSave,
  FaFilter,
  FaSearch,
  FaIdCard,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";

function MarkTeacherAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch("/data/teachers.json")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading teachers:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const initialAttendance = {};
    teachers.forEach((teacher) => {
      initialAttendance[teacher.id] = "Present";
    });
    setAttendanceData(initialAttendance);
  }, [teachers]); 

  function handleStatusChange(id, status) {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  }

  const getAttendanceStats = () => {
    const total = teachers.length;
    const present = Object.values(attendanceData).filter(status => status === 'Present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'Absent').length;
    const leave = Object.values(attendanceData).filter(status => status === 'Leave').length;
    const presentPercentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    return { total, present, absent, leave, presentPercentage };
  };

  const stats = getAttendanceStats();

  async function onSubmit() {
    if (!attendanceDate) {
      alert("Please select a date.");
      return;
    }

    setIsSubmitting(true);
    try {
    const record = {
      date: attendanceDate,
        records: teachers.map(teacher => ({
          teacherId: teacher.id,
          teacherName: teacher.name,
          status: attendanceData[teacher.id] || 'Present'
      }))
    };

      setTimeout(() => {
        console.log('Teacher Attendance to save:', record);
        alert('Teacher attendance marked successfully!');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving teacher attendance:', error);
      setIsSubmitting(false);
    }
  }

  const columns = [
    {
      header: 'Teacher Info',
      minWidth: '250px',
      width: '40%',
      render: (teacher) => (
        <div className="flex items-center space-x-3">
          <img
            src={teacher.profileImage || 'https://ui-avatars.com/api/?name=' + (teacher.name || 'Teacher') + '&background=random&color=fff&size=80'}
            alt={teacher.name || 'Teacher'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border-2 border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=' + (teacher.name || 'Teacher') + '&background=random&color=fff&size=80';
            }}
          />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 text-sm sm:text-base leading-tight truncate">{teacher.name || 'Unknown Teacher'}</div>
            <div className="text-xs sm:text-sm text-gray-500 leading-tight truncate">{teacher.email || 'No email'}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact Info',
      minWidth: '180px',
      width: '25%',
      render: (teacher) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <FaPhone className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 truncate">{teacher.phone || 'No phone'}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <FaIdCard className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500 truncate">ID: {teacher.id || 'N/A'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Teaching Info',
      minWidth: '160px',
      width: '25%',
      render: (teacher) => (
        <div className="space-y-2">
          {teacher.subjects && teacher.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {teacher.subjects.slice(0, 2).map((subject, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {subject}
                </span>
              ))}
              {teacher.subjects.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{teacher.subjects.length - 2} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-gray-500 italic">No subjects assigned</span>
          )}
        </div>
      )
    },
    {
      header: 'Attendance Status',
      minWidth: '240px',
      width: '35%',
      render: (teacher) => (
        <div className=" gap-2 flex ">
          {['Present', 'Absent', 'Leave'].map(status => {
            const isSelected = attendanceData[teacher.id] === status;
            const getStatusColor = () => {
              switch (status) {
                case 'Present':
                  return isSelected 
                    ? 'bg-green-500 text-white border-green-500 shadow-md' 
                    : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
                case 'Absent':
                  return isSelected 
                    ? 'bg-red-500 text-white border-red-500 shadow-md' 
                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
                case 'Leave':
                  return isSelected 
                    ? 'bg-yellow-500 text-white border-yellow-500 shadow-md' 
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100';
                default:
                  return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
              }
            };

            return (
            <button
              key={status}
              type="button"
                onClick={() => handleStatusChange(teacher.id, status)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg border transition-all duration-200 font-medium ${getStatusColor()}`}
            >
              {status}
            </button>
            );
          })}
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
              <FaChalkboardTeacher className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-700 font-medium">Loading teachers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4 -mx-6 -mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaUserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Mark Teacher Attendance</h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
          >
            <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="text-sm sm:text-base">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {showFilters && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FaCalendarAlt className="inline w-4 h-4 mr-1" />
                  Date
                </label>
          <input
            type="date"
            value={attendanceDate}
            onChange={e => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                  required
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting || teachers.length === 0}
                  className={`w-full bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting || teachers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaSave className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Submit Attendance'}</span>
                </button>
              </div>
        </div>
      </form>
        )}
      </div>

      {teachers.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaUserCheck className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaUserTimes className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.leave}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                <FaUserClock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.presentPercentage}%</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaChalkboardTeacher className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {teachers.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Teachers Attendance
              </h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {teachers.length} Teachers
              </div>
            </div>
          </div>
          
          <div className="p-6">
        <Table columns={columns} data={teachers} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <FaChalkboardTeacher className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Teachers Found</h3>
            <p className="text-gray-500">
              No teachers are available for attendance marking
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarkTeacherAttendance;
