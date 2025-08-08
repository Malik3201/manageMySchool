import {
  FaGraduationCap,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaUser,
  FaBook,
  FaMedal,
  FaAward,
  FaDownload,
  FaPrint,
  FaShare
} from "react-icons/fa";

const ReportCard = ({ report }) => {
  if (!report || report.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaGraduationCap className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Report Card Found</h3>
        <p className="text-gray-500">The requested report card could not be found.</p>
      </div>
    );
  }

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
    if (percentage >= 80) return { icon: FaMedal, color: 'text-green-500' };
    if (percentage >= 70) return { icon: FaAward, color: 'text-blue-500' };
    return { icon: FaChartLine, color: 'text-gray-500' };
  };

  return (
    <div className="space-y-8">
      {report.map((student, idx) => {
        const PerformanceIcon = getPerformanceIcon(student.percentage).icon;
        const performanceColor = getPerformanceIcon(student.percentage).color;
        
        return (
        <div
          key={idx}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FaGraduationCap className="w-8 h-8 text-white" />
                  </div>
            <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                {student.exam}
              </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm sm:text-base text-white text-opacity-90">
                      <div className="flex items-center space-x-1">
                        <FaUser className="w-3 h-3" />
                        <span className="font-semibold">{student.studentName || "Unnamed Student"}</span>
                      </div>
                      <span>•</span>
                      <span>{student.class} - Section {student.section}</span>
                      <span>•</span>
                      <span>Roll: <span className="font-semibold">{student.rollNumber}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span className="font-semibold">Academic Year 2025</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200">
                      <FaDownload className="w-4 h-4" />
                    </button>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200">
                      <FaPrint className="w-4 h-4" />
                    </button>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200">
                      <FaShare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Marks</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-800">{student.totalMarks}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaBook className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Obtained</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-800">{student.obtainedMarks}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <FaChartLine className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Percentage</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-800">{student.percentage}%</p>
                    </div>
                    <div className={`w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center`}>
                      <PerformanceIcon className={`w-5 h-5 text-white`} />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-6 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Grade</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-800">{student.grade}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="w-5 h-5 text-white" />
                    </div>
                  </div>
            </div>
          </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <FaBook className="w-5 h-5 text-green-500" />
                    <span>Subject-wise Performance</span>
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-gray-700">
                        <th className="text-left px-4 sm:px-6 py-4 font-semibold">Subject</th>
                        <th className="text-center px-4 py-4 font-semibold">Obtained</th>
                        <th className="text-center px-4 py-4 font-semibold">Total</th>
                        <th className="text-center px-4 py-4 font-semibold">Percentage</th>
                        <th className="text-center px-4 py-4 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                      {student.subjects.map((sub, index) => {
                        const percentage = ((sub.marksObtained / sub.totalMarks) * 100).toFixed(1);
                        return (
                  <tr
                    key={index}
                            className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                          >
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                  <FaBook className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-900">{sub.name}</span>
                              </div>
                    </td>
                            <td className="px-4 py-4 text-center">
                              <span className="font-semibold text-blue-600 text-sm sm:text-base">
                      {sub.marksObtained}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center text-gray-700 text-sm sm:text-base">
                              {sub.totalMarks}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="font-semibold text-purple-600 text-sm sm:text-base">
                                {percentage}%
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-lg border font-medium text-xs ${getGradeColor(sub.grade)}`}>
                                {sub.grade}
                              </span>
                    </td>
                  </tr>
                        );
                      })}
              </tbody>
            </table>
                </div>
          </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaAward className="w-5 h-5 text-white" />
            </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Teacher's Remarks</h4>
                    <p className="text-gray-700 leading-relaxed">{student.remarks}</p>
            </div>
            </div>
          </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>Generated on {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${student.percentage >= 80 ? 'bg-green-500' : student.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {student.percentage >= 80 ? 'Excellent Performance' : student.percentage >= 60 ? 'Good Performance' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportCard;
