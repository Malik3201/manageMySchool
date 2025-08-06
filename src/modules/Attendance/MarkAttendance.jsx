import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClassesDropdown from '../../components/ClassesDropdown';
import SectionsDropdown from '../../components/SectionsDropdown';
import Table from '../../components/Table';
import { 
  FaUserCheck, 
  FaUserTimes, 
  FaUserClock, 
  FaUsers, 
  FaCalendarAlt, 
  FaSave,
  FaFilter,
  FaSearch,
  FaChartBar,
  FaCheckCircle
} from 'react-icons/fa';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const selectedClass = watch("class");
  const selectedSection = watch("section");

  useEffect(() => {
    fetch('/data/students.json')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      stu => stu.class === selectedClass && stu.section === selectedSection
    );
    setFilteredStudents(filtered);

    const initialAttendance = {};
    filtered.forEach(stu => {
      initialAttendance[stu.id] = 'Present';
    });
    setAttendanceData(initialAttendance);
  }, [selectedClass, selectedSection, students]);

  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({ ...prev, [id]: status }));
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendanceData).filter(status => status === 'Present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'Absent').length;
    const leave = Object.values(attendanceData).filter(status => status === 'Leave').length;
    
    return { total, present, absent, leave };
  };

  const stats = getAttendanceStats();

  const onSubmit = async () => {
    if (!attendanceDate || !selectedClass || !selectedSection) {
      alert('Please select class, section, and date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const record = {
        date: attendanceDate,
        class: selectedClass,
        section: selectedSection,
        records: filteredStudents.map(stu => ({
          studentId: stu.id,
          status: attendanceData[stu.id] || 'Present'
        }))
      };
      
      setTimeout(() => {
        console.log('Attendance to save:', record);
        alert('Attendance marked successfully!');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving attendance:', error);
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Student Info',
      minWidth: '200px',
      width: '40%',
      render: (stu) => (
        <div className="flex items-center space-x-3">
          <img
            src={stu.profileImage || 'https://ui-avatars.com/api/?name=' + (stu.name || 'Student') + '&background=random&color=fff&size=80'}
            alt={stu.name || 'Student'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border-2 border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=' + (stu.name || 'Student') + '&background=random&color=fff&size=80';
            }}
          />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 text-sm sm:text-base leading-tight truncate">{stu.name || 'Unknown Student'}</div>
            <div className="text-xs sm:text-sm text-gray-500 leading-tight truncate">{stu.rollNumber || 'No Roll No'}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Class & Section',
      minWidth: '120px',
      width: '20%',
      render: (stu) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 text-sm leading-tight">{stu.class || 'N/A'}</div>
          <div className="text-xs text-gray-500 leading-tight">{stu.section || 'N/A'}</div>
        </div>
      )
    },
    {
      header: 'Attendance Status',
      minWidth: '240px',
      width: '40%',
      render: (stu) => (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {['Present', 'Absent', 'Leave'].map(status => {
            const isSelected = attendanceData[stu.id] === status;
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
                onClick={() => handleStatusChange(stu.id, status)}
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

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4 -mx-6 -mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaUserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Mark Attendance</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Class</label>
                <div className="bg-white bg-opacity-20 rounded-lg">
                  <ClassesDropdown register={register} errors={errors} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Section</label>
                <div className="bg-white bg-opacity-20 rounded-lg">
                  <SectionsDropdown register={register} errors={errors} />
                </div>
              </div>

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

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting || filteredStudents.length === 0}
                  className={`w-full bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting || filteredStudents.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaSave className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Submit'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {selectedClass && selectedSection && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
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
        </div>
      )}

      {filteredStudents.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Students List - {selectedClass} {selectedSection}
              </h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredStudents.length} Students
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Table columns={columns} data={filteredStudents} />
          </div>
        </div>
      ) : selectedClass && selectedSection ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-500">
              No students found for {selectedClass} - {selectedSection}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Class & Section</h3>
            <p className="text-gray-500">
              Please select a class and section to view students and mark attendance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
