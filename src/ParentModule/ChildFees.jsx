import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaChild,
  FaCalendarAlt,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
  FaMoneyBillWave,
  FaUsers,
  FaUserGraduate,
  FaExclamationTriangle,
  FaChartLine
} from "react-icons/fa";

function ChildFees() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parent, setParent] = useState({});
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const parentID = JSON.parse(localStorage.getItem("userId"));
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, studentsRes] = await Promise.all([
          fetch("/data/users.json"),
          fetch("/data/students.json")
        ]);
        
        const usersData = await usersRes.json();
        const studentsData = await studentsRes.json();
        
        setUsers(usersData);
        setStudents(studentsData);
      } catch (err) {
        setError("Failed to load fees data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  if (users.length && students.length) {
    const foundParent = users.find(e => e.id === parentID);
    setParent(foundParent);

      if (foundParent && foundParent.childrenID) {
    const filterStudent = students.filter(e => foundParent.childrenID.includes(e.id));
      setFilteredStudent(filterStudent);
    }
  }
}, [users, students, parentID]);

  const getFeesStats = () => {
    const total = filteredStudent.length;
    const paid = filteredStudent.filter(child => child.feesStatus === "Paid").length;
    const unpaid = filteredStudent.filter(child => child.feesStatus === "UnPaid").length;
    
    return { total, paid, unpaid };
  };

  const stats = getFeesStats();

  if (loading) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaSpinner className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">Loading fees information...</p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Fees</h3>
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
              <FaDollarSign className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Children Fees</h1>
              <p className="text-xs xs:text-sm text-gray-600">
                Welcome, <span className="font-semibold text-purple-600">{parent?.name || "Parent"}</span> - Track your children's fee status
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 xs:p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Children</p>
                <p className="text-xl xs:text-2xl font-bold text-purple-800">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Fees Paid</p>
                <p className="text-xl xs:text-2xl font-bold text-green-800">{stats.paid}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 xs:p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Fees Pending</p>
                <p className="text-xl xs:text-2xl font-bold text-red-800">{stats.unpaid}</p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <FaTimesCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 xs:px-6 py-4 xs:py-6">
            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              <div>
                <h2 className="text-lg xs:text-xl font-bold text-white">Fees Status Overview</h2>
                <p className="text-sm text-white text-opacity-90">Monitor your children's fee payments</p>
              </div>
            </div>
          </div>

          <div className="p-4 xs:p-6">
            {filteredStudent.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChild className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Found</h3>
                <p className="text-gray-500">No children are associated with your account.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
                {filteredStudent.map((child, index) => (
                  <div key={child.id || index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <FaUserGraduate className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{child.name}</h3>
                          <p className="text-sm text-white text-opacity-90">Class: {child.class} - Section: {child.section}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 xs:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Fee Status:</span>
                        <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-white text-sm font-medium ${
                          child.feesStatus === "UnPaid" ? "bg-red-500" : "bg-green-500"
                        }`}>
                          {child.feesStatus === "UnPaid" ? (
                            <>
                              <FaTimesCircle className="w-3 h-3" />
                              <span>Unpaid</span>
                            </>
                          ) : (
                            <>
                              <FaCheckCircle className="w-3 h-3" />
                              <span>Paid</span>
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Monthly Fee:</span>
                        <span className="text-lg font-bold text-purple-600">$150</span>
  </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Due Date:</span>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
</div>

                      {child.feesStatus === "UnPaid" ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 xs:p-4">
                          <div className="flex items-start space-x-2">
                            <FaExclamationTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800">Payment Required</p>
                              <p className="text-xs text-red-600 mt-1">Please pay this month's fee on time to avoid late charges.</p>
                            </div>
                          </div>
                          <button className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                            <FaCreditCard className="w-4 h-4" />
                            <span>Pay Now</span>
                          </button>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 xs:p-4">
                          <div className="flex items-start space-x-2">
                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">Payment Complete</p>
                              <p className="text-xs text-green-600 mt-1">Thank you for paying the fees on time!</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );


}export default ChildFees