import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaSpinner,
  FaExclamationCircle,
  FaGraduationCap,
  FaChild,
  FaCalendarAlt,
  FaUser,
  FaBook,
  FaChartLine,
  FaTrophy,
  FaMedal,
  FaAward,
  FaUserGraduate
} from "react-icons/fa";

const ParentReport = () => {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [parent, setParent] = useState(null);
  const [childrenReports, setChildrenReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportsData = async () => {
      setLoading(true);
      try {
        const [usersRes, reportsRes, studentsRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/reports.json"),
          fetch("/data/students.json")
        ]);

        const users = await usersRes.json();
        const reports = await reportsRes.json();
        const students = await studentsRes.json();

        const foundParent = users.find((user) => user.id === currentUserId);
        setParent(foundParent);

        if (!foundParent || !foundParent.childrenID) {
          setError("No children found for this parent account");
          return;
        }

        const childrenWithReports = foundParent.childrenID.map((childId) => {
          const student = students.find((s) => s.id === childId);
          const childReports = reports.filter((rep) => rep.studentId === childId);
          
          return {
            id: childId,
            name: student?.name || "Unknown Student",
            class: student?.class || "N/A",
            section: student?.section || "N/A",
            rollNumber: student?.rollNumber || "N/A",
            reports: childReports
          };
        });

        setChildrenReports(childrenWithReports);
      } catch (err) {
        setError("Failed to load reports data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, [currentUserId]);

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800 border-green-200',
      'A': 'bg-green-100 text-green-800 border-green-200',
      'B+': 'bg-blue-100 text-blue-800 border-blue-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C+': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'D': 'bg-orange-100 text-orange-800 border-orange-200',
      'F': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[grade] || colors['F'];
  };

  const getPerformanceIcon = (percentage) => {
    if (percentage >= 90) return { icon: FaTrophy, color: 'text-yellow-500' };
    if (percentage >= 80) return { icon: FaMedal, color: 'text-purple-500' };
    if (percentage >= 70) return { icon: FaAward, color: 'text-blue-500' };
    return { icon: FaChartLine, color: 'text-gray-500' };
  };

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading reports...</p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Reports</h3>
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
              <FaFileAlt className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Children Reports</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                <span className="font-semibold text-purple-600">{parent?.name}</span> - View your children's academic reports
              </p>
            </div>
          </div>
        </div>

        {childrenReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
              <div className="flex items-center space-x-3">
                <FaChild className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-white">Children Reports</h2>
                  <p className="text-sm text-white text-opacity-90">Academic performance overview</p>
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
            {childrenReports.map((child) => (
              <div key={child.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaUserGraduate className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-white">{child.name}</h3>
                      <p className="text-sm text-white text-opacity-90">
                        Class: {child.class} - Section: {child.section}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 xs:p-6">
                  {child.reports.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaFileAlt className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="text-gray-500">No reports available for {child.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {child.reports.map((report, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4 xs:p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaBook className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{report.examType} Report</h4>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <FaCalendarAlt className="w-3 h-3" />
                                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Subject</th>
                                  <th className="text-center py-2 px-3 font-semibold text-gray-900">Marks</th>
                                  <th className="text-center py-2 px-3 font-semibold text-gray-900">Total</th>
                                  <th className="text-center py-2 px-3 font-semibold text-gray-900">Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {report.subjects.map((subject, subIndex) => {
                                  const percentage = Math.round((subject.marksObtained / subject.totalMarks) * 100);
                                  const IconComponent = getPerformanceIcon(percentage).icon;
                                  return (
                                    <tr key={subIndex} className="border-b border-gray-100">
                                      <td className="py-3 px-3">
                                        <div className="flex items-center space-x-2">
                                          <IconComponent className={`w-4 h-4 ${getPerformanceIcon(percentage).color}`} />
                                          <span className="font-medium text-gray-900">{subject.subjectName}</span>
                                        </div>
                                      </td>
                                      <td className="text-center py-3 px-3 font-semibold text-purple-600">
                                        {subject.marksObtained}
                                      </td>
                                      <td className="text-center py-3 px-3 text-gray-600">
                                        {subject.totalMarks}
                                      </td>
                                      <td className="text-center py-3 px-3">
                                        <span className={`inline-block px-3 py-1 rounded-lg border text-sm font-semibold ${getGradeColor(subject.grade)}`}>
                                          {subject.grade}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ParentReport;
