
import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  FaCalendarCheck,
  FaUser,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaGraduationCap,
  FaSpinner,
  FaTrophy,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaPercentage,
  FaUsers
} from "react-icons/fa";

export default function ViewStudentAttendance() {
  const [student, setStudent] = useState({});
  const [attendanceData, setAttendanceData] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    percentage: 0
  });

  const studentId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, attendanceRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/studentAttendanceData.json")
        ]);

        const users = await usersRes.json();
        const attendance = await attendanceRes.json();

        const studentObj = users.find(e => e.id === studentId);
        const getAttendance = attendance.find(e => e.studentId === studentId);

        setStudent(studentObj || {});
        setAttendanceData(getAttendance || {});
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  useEffect(() => {
    if (attendanceData && attendanceData.attendance?.length >= 0) {
      const attendance = attendanceData.attendance || [];
      const totalDays = attendance.length;
      const presentDays = attendance.filter(e => e.status === "present").length;
      const absentDays = attendance.filter(e => e.status === "absent").length;
      const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

      setStats({
        totalDays,
        presentDays,
        absentDays,
        percentage: parseFloat(percentage)
      });

      const progressMsg = percentage >= 75 
        ? "Excellent Attendance! Keep it up!" 
        : percentage >= 60 
        ? "Good Attendance Progress" 
        : "Attendance needs improvement";

      setProgress({
        msg: progressMsg,
        percentage: parseFloat(percentage),
        status: percentage >= 75 ? "excellent" : percentage >= 60 ? "good" : "needs-improvement"
      });
    }
  }, [attendanceData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "text-green-600 bg-green-100";
      case "absent":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    return status === "present" ? 
      <FaCheckCircle className="w-4 h-4 text-green-600" /> : 
      <FaTimesCircle className="w-4 h-4 text-red-600" />;
  };

  const getProgressColor = () => {
    if (progress.status === "excellent") return "from-green-500 to-green-600";
    if (progress.status === "good") return "from-blue-500 to-blue-600";
    return "from-orange-500 to-orange-600";
  };

  const getProgressIcon = () => {
    if (progress.status === "excellent") return <FaTrophy className="w-6 h-6 text-white" />;
    if (progress.status === "good") return <FaChartLine className="w-6 h-6 text-white" />;
    return <FaExclamationTriangle className="w-6 h-6 text-white" />;
  };

  const columns = [
    {
      header: "Date",
      accessor: "date",
      minWidth: '120px',
      width: '40%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-green-500" />
          <span className="font-medium text-gray-900 text-sm">{row.date}</span>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "status",
      minWidth: '120px',
      width: '40%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(row.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(row.status)}`}>
            {row.status}
          </span>
        </div>
      )
    },
    {
      header: "Day",
      accessor: "date",
      minWidth: '100px',
      width: '20%',
      render: (row) => (
        <span className="text-sm text-gray-600">
          {new Date(row.date).toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading attendance data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 xs:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarCheck className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">My Attendance</h1>
              <p className="text-xs xs:text-sm text-gray-600">Track your monthly attendance record</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Total Days</p>
                <p className="text-xl xs:text-2xl font-bold text-gray-900">{stats.totalDays}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Present</p>
                <p className="text-xl xs:text-2xl font-bold text-green-600">{stats.presentDays}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 xs:w-6 xs:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Absent</p>
                <p className="text-xl xs:text-2xl font-bold text-red-600">{stats.absentDays}</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaTimesCircle className="w-5 h-5 xs:w-6 xs:h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 xs:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-xl xs:text-2xl font-bold text-gray-900">{stats.percentage}%</p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaPercentage className="w-5 h-5 xs:w-6 xs:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {progress?.msg && (
          <div className={`bg-gradient-to-r ${getProgressColor()} rounded-2xl shadow-xl border border-gray-200 overflow-hidden`}>
            <div className="px-4 xs:px-6 py-6 xs:py-8">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  {getProgressIcon()}
                </div>
                <div className="text-center sm:text-left text-white flex-1">
                  <h2 className="text-xl xs:text-2xl font-bold mb-2">{progress.msg}</h2>
                  <p className="text-sm xs:text-base text-white text-opacity-90">
                    Your attendance percentage for this month
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl xs:text-5xl font-bold text-white mb-1">{progress.percentage}%</p>
                  <p className="text-sm text-white text-opacity-80">Attendance Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <FaUser className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-white">{student.name}'s Attendance Record</h2>
                  <p className="text-sm text-white text-opacity-90">Monthly attendance details</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white text-opacity-90">
                <FaClock className="w-4 h-4" />
                <span className="text-sm">Current Month</span>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6">
            {attendanceData.attendance && attendanceData.attendance.length > 0 ? (
              <Table 
                columns={columns} 
                data={attendanceData.attendance} 
                emptyMessage="No attendance records found"
              />
            ) : (
              <div className="text-center py-12">
                <FaCalendarCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Attendance Data</h3>
                <p className="text-gray-500">No attendance records found for this month.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}