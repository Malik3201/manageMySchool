import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import {
  FaClipboardList,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaUsers,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaFileDownload,
  FaChartPie,
  FaCalendarCheck
} from 'react-icons/fa';

const DailyReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [reportRows, setReportRows] = useState([]);
  const [students, setStudents] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/attendance.json').then(res => res.json()),
      fetch('/data/students.json').then(res => res.json())
    ]).then(([attendance, studentData]) => {
      setAttendanceData(attendance);
      setStudents(studentData);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    let filtered = attendanceData.filter(item => item.date === selectedDate);

    if (selectedClass) {
      filtered = filtered.filter(item => item.class === selectedClass);
    }
    if (selectedSection) {
      filtered = filtered.filter(item => item.section === selectedSection);
    }

    const rows = filtered.flatMap(item =>
      item.records.map(rec => {
        const student = students.find(s => s.id === rec.studentId);
        return {
        class: item.class,
        section: item.section,
        studentId: rec.studentId,
          studentName: student ? student.name : 'Unknown Student',
          rollNumber: student ? student.rollNumber : 'N/A',
          profileImage: student ? student.profileImage : null,
        status: rec.status
        };
      })
    );
    setReportRows(rows);
  }, [selectedDate, selectedClass, selectedSection, attendanceData, students]);

  const getReportStats = () => {
    const total = reportRows.length;
    const present = reportRows.filter(row => row.status === 'Present').length;
    const absent = reportRows.filter(row => row.status === 'Absent').length;
    const leave = reportRows.filter(row => row.status === 'Leave').length;
    const presentPercentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    return { total, present, absent, leave, presentPercentage };
  };

  const stats = getReportStats();

  const getUniqueClasses = () => {
    return [...new Set(attendanceData.map(item => item.class))].sort();
  };

  const getUniqueSections = () => {
    let sections = attendanceData.map(item => item.section);
    if (selectedClass) {
      sections = attendanceData
        .filter(item => item.class === selectedClass)
        .map(item => item.section);
    }
    return [...new Set(sections)].sort();
  };

  const clearFilters = () => {
    setSelectedClass('');
    setSelectedSection('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const columns = [
    {
      header: 'Student Info',
      minWidth: '200px',
      width: '35%',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.profileImage || 'https://ui-avatars.com/api/?name=' + (row.studentName || 'Student') + '&background=random&color=fff&size=80'}
            alt={row.studentName || 'Student'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border-2 border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=' + (row.studentName || 'Student') + '&background=random&color=fff&size=80';
            }}
          />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 text-sm sm:text-base leading-tight truncate">{row.studentName || 'Unknown Student'}</div>
            <div className="text-xs sm:text-sm text-gray-500 leading-tight truncate">{row.rollNumber || row.studentId}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Class & Section',
      minWidth: '120px',
      width: '20%',
      render: (row) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 text-sm leading-tight">{row.class || 'N/A'}</div>
          <div className="text-xs text-gray-500 leading-tight">{row.section || 'N/A'}</div>
        </div>
      )
    },
    {
      header: 'Student ID',
      minWidth: '100px',
      width: '15%',
      render: (row) => (
        <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded text-center">
          {row.studentId || 'N/A'}
        </div>
      )
    },
    {
      header: 'Attendance Status',
      minWidth: '140px',
      width: '30%',
      render: (row) => {
        const getStatusConfig = () => {
          switch (row.status) {
            case 'Present':
              return {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: FaUserCheck,
                iconColor: 'text-green-600'
              };
            case 'Absent':
              return {
                color: 'bg-red-100 text-red-800 border-red-200',
                icon: FaUserTimes,
                iconColor: 'text-red-600'
              };
            case 'Leave':
              return {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: FaUserClock,
                iconColor: 'text-yellow-600'
              };
            default:
              return {
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                icon: FaUsers,
                iconColor: 'text-gray-600'
              };
          }
        };

        const config = getStatusConfig();
        const Icon = config.icon;

        return (
          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border font-medium text-sm ${config.color}`}>
            <Icon className={`w-3 h-3 ${config.iconColor}`} />
            <span>{row.status || 'Unknown'}</span>
          </div>
        );
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4 -mx-6 -mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Daily Attendance Report</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
            >
              <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-sm sm:text-base">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <button
              onClick={() => console.log('Export report:', reportRows)}
              className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
            >
              <FaFileDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-sm sm:text-base">Export</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <FaCalendarAlt className="inline w-4 h-4 mr-1" />
                  Date
                </label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
        />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Class</label>
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:bg-opacity-30"
                >
                  <option value="" className="text-gray-700">All Classes</option>
                  {getUniqueClasses().map(cls => (
                    <option key={cls} value={cls} className="text-gray-700">{cls}</option>
          ))}
        </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Section</label>
        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:bg-opacity-30"
                >
                  <option value="" className="text-gray-700">All Sections</option>
                  {getUniqueSections().map(sec => (
                    <option key={sec} value={sec} className="text-gray-700">{sec}</option>
          ))}
        </select>
      </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDate && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
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
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.presentPercentage}%</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaChartPie className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {reportRows.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Attendance Report
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedDate && `Report for ${new Date(selectedDate).toLocaleDateString()}`}
                  {selectedClass && ` - ${selectedClass}`}
                  {selectedSection && ` ${selectedSection}`}
                </p>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {reportRows.length} Records
              </div>
            </div>
          </div>
          
          <div className="p-6">
      <Table columns={columns} data={reportRows} />
          </div>
        </div>
      ) : selectedDate ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <FaCalendarCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Attendance Records</h3>
            <p className="text-gray-500">
              No attendance records found for the selected date and filters.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Date</h3>
            <p className="text-gray-500">
              Please select a date to view attendance reports
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReport;
