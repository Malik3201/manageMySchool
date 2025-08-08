import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import axios from "axios";
import {
  FaSearch,
  FaFileAlt,
  FaGraduationCap,
  FaChartLine,
  FaUsers,
  FaSpinner,
  FaExclamationCircle,
  FaDownload,
  FaPrint,
  FaEye,
  FaFilter,
  FaCalendarAlt
} from "react-icons/fa";

const Reports = () => {
  const [rollNo, setRollNo] = useState("");
  const [report, setReport] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [examFilter, setExamFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const handleInput = (e) => {
    setRollNo(e.target.value);
  };

  const handleSearch = () => {
    if (!rollNo.trim()) return;
    setLoading(true);
    setSearch(rollNo.trim());
    
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const newSearch = rollNo.trim();
    if (!recent.includes(newSearch)) {
      const updatedRecent = [newSearch, ...recent.slice(0, 4)];
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    }
  };

  const handleRecentSearch = (rollNumber) => {
    setRollNo(rollNumber);
    setSearch(rollNumber);
    setLoading(true);
  };

  const clearSearch = () => {
    setRollNo("");
    setReport(null);
    setSearch("");
  };

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const res = await axios.get("/data/reports.json");
        setAllReports(res.data || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setAllReports([]);
      }
    };
    fetchAllReports();

    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent);
  }, []);

  useEffect(() => {
    if (!search) return;
    
    setTimeout(() => {
      let filtered = allReports.filter((rep) => rep.rollNumber === search);
      
      if (examFilter) {
        filtered = filtered.filter(rep => rep.exam.includes(examFilter));
      }
      if (classFilter) {
        filtered = filtered.filter(rep => rep.class.includes(classFilter));
      }
      
      setReport(filtered.length > 0 ? filtered : []);
      setLoading(false);
    }, 800);
  }, [search, allReports, examFilter, classFilter]);

  const getStats = () => {
    const totalReports = allReports.length;
    const uniqueStudents = new Set(allReports.map(r => r.studentId)).size;
    const avgPercentage = allReports.length > 0 
      ? (allReports.reduce((sum, r) => sum + r.percentage, 0) / allReports.length).toFixed(1)
      : 0;
    const excellentGrades = allReports.filter(r => ['A+', 'A'].includes(r.grade)).length;
    
    return { totalReports, uniqueStudents, avgPercentage, excellentGrades };
  };

  const stats = getStats();

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reports Management</h1>
              <p className="text-sm text-gray-600">Search and view student academic reports</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaFileAlt className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.uniqueStudents}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.avgPercentage}%</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaChartLine className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">A+ Grades</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.excellentGrades}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Student Report Search</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
              >
                <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-sm sm:text-base">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-4 h-4" />
                  <input
                    placeholder="Enter Roll No (e.g. 6-A-01)"
                    type="text"
                    value={rollNo}
                    onChange={handleInput}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    disabled={!rollNo.trim() || loading}
                    className={`bg-white text-red-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      !rollNo.trim() || loading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-100 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaSearch className="w-4 h-4" />
                    )}
                    <span className="text-sm sm:text-base">Search</span>
                  </button>
                  {(rollNo || report) && (
                    <button
                      onClick={clearSearch}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                        Exam Filter
                      </label>
                      <select
                        value={examFilter}
                        onChange={(e) => setExamFilter(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:outline-none focus:bg-opacity-30"
                      >
                        <option value="" className="text-gray-900">All Exams</option>
                        <option value="Final" className="text-gray-900">Final Exam</option>
                        <option value="Mid" className="text-gray-900">Mid Term</option>
                        <option value="Monthly" className="text-gray-900">Monthly Test</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <FaGraduationCap className="inline w-3 h-3 mr-1" />
                        Class Filter
                      </label>
                      <select
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:outline-none focus:bg-opacity-30"
                      >
                        <option value="" className="text-gray-900">All Classes</option>
                        <option value="Class 6" className="text-gray-900">Class 6</option>
                        <option value="Class 7" className="text-gray-900">Class 7</option>
                        <option value="Class 8" className="text-gray-900">Class 8</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {recentSearches.length > 0 && !search && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((recent, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(recent)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <FaSearch className="w-3 h-3" />
                      <span>{recent}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                    <FaSpinner className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <p className="text-gray-700 font-medium">Searching for reports...</p>
                </div>
              </div>
            )}

            {!loading && report && report.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <FaFileAlt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Report Found!</h3>
                      <p className="text-sm text-green-600">Found {report.length} report(s) for "{search}"</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <FaDownload className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <FaPrint className="w-4 h-4" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                  </div>
                </div>
                <ReportCard report={report} />
              </div>
            )}

            {!loading && report?.length === 0 && search && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Report Found</h3>
                <p className="text-gray-500 mb-4">
                  No report found for roll number "{search}". Please check the roll number and try again.
                </p>
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Try Another Search
                </button>
              </div>
            )}

            {!loading && !search && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Student Reports</h3>
                <p className="text-gray-500">
                  Enter a student's roll number to view their academic report card.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
