import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClassesDropdown from '../../components/ClassesDropdown';
import SectionsDropdown from '../../components/SectionsDropdown';
import Table from '../../components/Table';
import {
  FaDollarSign,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaSave,
  FaFilter,
  FaSearch,
  FaEye,
  FaEdit,
  FaDownload,
  FaChartLine,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaSpinner
} from "react-icons/fa";

const FeesManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [feesMonth, setFeesMonth] = useState(new Date().toISOString().slice(0, 7));
  const [feesData, setFeesData] = useState({});
  const [feeAmount, setFeeAmount] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const selectedClass = watch("class");
  const selectedSection = watch("section");

  useEffect(() => {
    setLoading(true);
    fetch('/data/students.json')
      .then(res => res.json())
      .then(data => {
        setStudents(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      const filtered = students.filter(
        stu => stu.class === selectedClass && stu.section === selectedSection
      );
      setFilteredStudents(filtered);

      const initialFeesStatus = {};
      filtered.forEach(stu => {
        initialFeesStatus[stu.id] = Math.random() > 0.6 ? 'Paid' : 'Unpaid';
      });
      setFeesData(initialFeesStatus);
    } else {
      setFilteredStudents([]);
      setFeesData({});
    }
  }, [selectedClass, selectedSection, students]);

  const getFilteredData = () => {
    let filtered = filteredStudents;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toString().includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(student => feesData[student.id] === statusFilter);
    }

    return filtered;
  };

  const displayData = getFilteredData();

  const getStats = () => {
    const total = filteredStudents.length;
    const paid = filteredStudents.filter(stu => feesData[stu.id] === 'Paid').length;
    const unpaid = total - paid;
    const totalAmount = total * feeAmount;
    const paidAmount = paid * feeAmount;
    const unpaidAmount = unpaid * feeAmount;
    const collectionRate = total > 0 ? ((paid / total) * 100).toFixed(1) : 0;

    return { total, paid, unpaid, totalAmount, paidAmount, unpaidAmount, collectionRate };
  };

  const stats = getStats();

  const handleStatusChange = (id, status) => {
    setFeesData(prev => ({ ...prev, [id]: status }));
  };

  const handleBulkStatusChange = (status) => {
    const updatedData = { ...feesData };
    displayData.forEach(student => {
      updatedData[student.id] = status;
    });
    setFeesData(updatedData);
  };

  const onSubmit = async () => {
    if (!selectedClass || !selectedSection || !feesMonth) {
      alert('Please select class, section, and month.');
      return;
    }

    setIsSubmitting(true);
    
    const record = {
      month: feesMonth,
      class: selectedClass,
      section: selectedSection,
      feeAmount: feeAmount,
      records: filteredStudents.map(stu => ({
        studentId: stu.id,
        studentName: stu.name,
        rollNumber: stu.rollNumber,
        status: feesData[stu.id] || 'Unpaid',
        amount: feeAmount,
        updatedAt: new Date().toISOString()
      })),
      stats: stats
    };
    
    setTimeout(() => {
      console.log('Fees Data saved:', record);
      alert('Fees data updated successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  const columns = [
    {
      header: "Student Info",
      minWidth: '200px',
      width: '30%',
      render: (student) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {student.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">{student.name || 'N/A'}</div>
              <div className="text-xs sm:text-sm text-gray-500">Roll: {student.rollNumber || 'N/A'}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Fee Amount",
      minWidth: '120px',
      width: '20%',
      render: (student) => (
        <div className="text-center">
          <div className="font-semibold text-gray-900 text-sm sm:text-base">Rs. {feeAmount.toLocaleString()}</div>
          <div className="text-xs text-gray-500">{feesMonth}</div>
        </div>
      )
    },
    {
      header: "Payment Status",
      minWidth: '150px',
      width: '25%',
      render: (student) => {
        const status = feesData[student.id] || 'Unpaid';
        const statusConfig = {
          'Paid': { color: 'bg-green-100 text-green-800 border-green-200', icon: FaCheckCircle },
          'Unpaid': { color: 'bg-red-100 text-red-800 border-red-200', icon: FaTimesCircle },
          'Partial': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: FaClock }
        };
        
        const config = statusConfig[status] || statusConfig['Unpaid'];
        const StatusIcon = config.icon;

        return (
          <div className="flex items-center justify-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-lg border font-medium text-xs ${config.color}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status}
            </span>
          </div>
        );
      }
    },
    {
      header: "Actions",
      minWidth: '200px',
      width: '25%',
      render: (student) => (
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          <button
            onClick={() => handleStatusChange(student.id, 'Paid')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
              feesData[student.id] === 'Paid'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <FaCheckCircle className="w-3 h-3 inline mr-1" />
            Paid
          </button>
          <button
            onClick={() => handleStatusChange(student.id, 'Unpaid')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
              feesData[student.id] === 'Unpaid'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <FaTimesCircle className="w-3 h-3 inline mr-1" />
            Unpaid
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                <FaDollarSign className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 font-medium">Loading fees management...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Fees Management</h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaFilter className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Fee Collection Form</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
              >
                <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-sm sm:text-base">{showFilters ? 'Hide Form' : 'Show Form'}</span>
              </button>
            </div>

            {showFilters && (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
                  <div>
                     <h3 className='text-white mb-1'>Classes</h3>
                    <ClassesDropdown register={register} errors={errors} required={true} variant="admin" />
                  </div>
                  
                  <div>
                     <h3 className='text-white mb-1'>Sections</h3>

                    <SectionsDropdown register={register} errors={errors} required={true} variant="admin" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                      Month
                    </label>
                    <input
                      type="month"
                      value={feesMonth}
                      onChange={e => setFeesMonth(e.target.value)}
                      className="w-full px-3 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <FaMoneyBillWave className="inline w-3 h-3 mr-1" />
                      Fee Amount
                    </label>
                    <input
                      type="number"
                      value={feeAmount}
                      onChange={e => setFeeAmount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="lg:mt-7">
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedClass || !selectedSection}
                      className={`w-full bg-white text-red-600 px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                        isSubmitting || !selectedClass || !selectedSection
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-100 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                          <span className="text-sm sm:text-base">Saving...</span>
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-sm sm:text-base">Update</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {selectedClass && selectedSection && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <p className="text-sm font-medium text-gray-600">Fees Paid</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.paid}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                

                <div className="md:col-span-1 col-span-2 bg-white rounded-xl p-4 sm:p-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between md:p-4 ">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Collected</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">Rs.{stats.paidAmount.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <FaDollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between ">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Fees Due</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.unpaid}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <FaExclamationTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.collectionRate}%</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FaChartLine className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="col-span-2 lg:col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Paid">Paid Only</option>
                    <option value="Unpaid">Unpaid Only</option>
                  </select>
                  <button
                    onClick={() => handleBulkStatusChange('Paid')}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <FaCheckCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Mark All Paid</span>
                    <span className="sm:hidden">All Paid</span>
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange('Unpaid')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <FaTimesCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Mark All Unpaid</span>
                    <span className="sm:hidden">All Unpaid</span>
                  </button>
                </div>
              </div>

              {displayData.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Student Fee Status
                      </h3>
                      <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {displayData.length} Student{displayData.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Table columns={columns} data={displayData} />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center">
                    <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
                    <p className="text-gray-500">
                      {searchTerm || statusFilter !== "all" 
                        ? "No students match your current search and filter criteria."
                        : "Please select a class and section to view student fee information."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeesManagement;
