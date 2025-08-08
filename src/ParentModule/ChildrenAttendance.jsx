import { useEffect, useState } from "react";
import Table from "../components/Table";
import {
  FaCalendarCheck,
  FaChild,
  FaCalendarAlt,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUsers,
  FaUserGraduate,
  FaChartLine,
  FaTrophy,
  FaExclamationTriangle,
  FaPercentage
} from "react-icons/fa";

function ChildrenAttendance() {
  const [childrenData, setChildrenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parent, setParent] = useState(null);
  const parentID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [usersRes, studentsRes, attendanceRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/students.json"),
          fetch("/data/studentAttendanceData.json"),
        ]);

        const users = await usersRes.json();
        const students = await studentsRes.json();
        const attendanceData = await attendanceRes.json();

        const foundParent = users.find((u) => u.id === parentID);
        setParent(foundParent);

        if (!foundParent || !Array.isArray(foundParent.childrenID)) {
          setError("No children found for this parent account");
          return;
        }

        const mappedChildren = foundParent.childrenID.map((childId) => {
          const student = students.find((s) => s.id === childId);
          const studentAttendance = attendanceData.find(
            (a) => a.studentId === childId
          );

          const attendance = studentAttendance?.attendance || [];

          const total = attendance.length;
          const present = attendance.filter((a) => a.status === "present").length;
          const absent = attendance.filter((a) => a.status === "absent").length;
          const percent = total > 0 ? Math.round((present / total) * 100) : 0;
          
          const getAttendanceMessage = (percentage) => {
            if (percentage >= 90) return "Excellent attendance! Keep it up!";
            if (percentage >= 80) return "Good attendance record";
            if (percentage >= 70) return "Attendance needs some improvement";
            return "Poor attendance - immediate attention required";
          };

          const getAttendanceIcon = (percentage) => {
            if (percentage >= 90) return FaTrophy;
            if (percentage >= 80) return FaCheckCircle;
            if (percentage >= 70) return FaExclamationTriangle;
            return FaTimesCircle;
          };

          const getAttendanceColor = (percentage) => {
            if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
            if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
            if (percentage >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
            return "text-red-600 bg-red-50 border-red-200";
          };

          return {
            id: childId,
            name: student?.name || "Unknown Student",
            class: student?.class || "N/A",
            section: student?.section || "N/A",
            rollNumber: student?.rollNumber || "N/A",
            attendance,
            stats: {
              total,
              present,
              absent,
              percentage: percent,
              message: getAttendanceMessage(percent),
              icon: getAttendanceIcon(percent),
              colorClass: getAttendanceColor(percent)
            }
          };
        });

        setChildrenData(mappedChildren);
      } catch (err) {
        setError("Failed to load attendance data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [parentID]);

  const getOverallStats = () => {
    if (childrenData.length === 0) return { totalChildren: 0, avgAttendance: 0, excellentCount: 0, needsAttentionCount: 0 };
    
    const totalChildren = childrenData.length;
    const avgAttendance = Math.round(
      childrenData.reduce((sum, child) => sum + child.stats.percentage, 0) / totalChildren
    );
    const excellentCount = childrenData.filter(child => child.stats.percentage >= 90).length;
    const needsAttentionCount = childrenData.filter(child => child.stats.percentage < 70).length;
    
    return { totalChildren, avgAttendance, excellentCount, needsAttentionCount };
  };

  const overallStats = getOverallStats();

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <FaCheckCircle className="w-3 h-3" />;
      case 'absent': return <FaTimesCircle className="w-3 h-3" />;
      case 'late': return <FaClock className="w-3 h-3" />;
      default: return null;
    }
  };

  const attendanceColumns = [
    {
      header: 'Date',
      accessor: 'date',
      width: '40%',
      render: (record) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-purple-500" />
          <span className="font-medium text-gray-900">{record.date}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '40%',
      render: (record) => (
        <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg border font-medium text-sm ${getStatusColor(record.status)}`}>
          {getStatusIcon(record.status)}
          <span className="capitalize">{record.status}</span>
        </span>
      )
    },
    {
      header: 'Day',
      accessor: 'day',
      width: '20%',
      render: (record) => (
        <span className="text-sm text-gray-600 capitalize">
          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading attendance data...</p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Attendance</h3>
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
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCalendarCheck className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Children Attendance</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                Welcome, <span className="font-semibold text-purple-600">{parent?.name || "Parent"}</span> - Monitor your children's attendance
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 xs:p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Children</p>
                <p className="text-xl xs:text-2xl font-bold text-purple-800">{overallStats.totalChildren}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 xs:p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg Attendance</p>
                <p className="text-xl xs:text-2xl font-bold text-blue-800">{overallStats.avgAttendance}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FaPercentage className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Excellent</p>
                <p className="text-xl xs:text-2xl font-bold text-green-800">{overallStats.excellentCount}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaTrophy className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 xs:p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Need Attention</p>
                <p className="text-xl xs:text-2xl font-bold text-red-800">{overallStats.needsAttentionCount}</p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {childrenData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
              <div className="flex items-center space-x-3">
                <FaChild className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-white">Children Attendance</h2>
                  <p className="text-sm text-white text-opacity-90">Track your children's school attendance</p>
                </div>
              </div>
            </div>
            <div className="p-4 xs:p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChild className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Found</h3>
                <p className="text-gray-500">No children are associated with your account.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 xs:space-y-6">
            {childrenData.map((child) => {
              const IconComponent = child.stats.icon;
              return (
                <div key={child.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <FaUserGraduate className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg xs:text-xl font-bold text-white">{child.name}</h3>
                          <p className="text-sm text-white text-opacity-90">
                            Class: {child.class} - Section: {child.section} | Roll: {child.rollNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-white text-opacity-90">
                        <FaChartLine className="w-4 h-4" />
                        <span className="text-sm">Attendance: {child.stats.percentage}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 xs:p-6 space-y-4 xs:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-600">Total Days</p>
                            <p className="text-xl font-bold text-blue-800">{child.stats.total}</p>
                          </div>
                          <FaCalendarAlt className="w-8 h-8 text-blue-500" />
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-600">Present</p>
                            <p className="text-xl font-bold text-green-800">{child.stats.present}</p>
                          </div>
                          <FaCheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                      </div>

                      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-red-600">Absent</p>
                            <p className="text-xl font-bold text-red-800">{child.stats.absent}</p>
                          </div>
                          <FaTimesCircle className="w-8 h-8 text-red-500" />
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${child.stats.colorClass}`}>
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6" />
                        <div>
                          <p className="font-semibold">Attendance Progress</p>
                          <p className="text-sm opacity-90">{child.stats.message}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-2xl font-bold">{child.stats.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-4 xs:px-6 py-4 border-b border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                          <FaCalendarCheck className="w-5 h-5 text-purple-500" />
                          <span>Attendance Records</span>
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <Table columns={attendanceColumns} data={child.attendance} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChildrenAttendance;
