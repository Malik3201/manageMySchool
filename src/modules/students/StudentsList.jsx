import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import StudentModal from "./StudentModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/studentsSlice";
import ConfirmModal from "./ConfirmModal";
import DetailModal from "./DetailModal";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import { useForm } from "react-hook-form";
import { 
  FaUserGraduate, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaEye,
  FaUsers,
  FaMale,
  FaFemale,
  FaUserFriends,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const StudentsList = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.studentsSlice);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setStudentsList(Array.isArray(students) ? students : []);
  }, [students]);

  const filterStudents = (e) => {
    const value = e.target.value;
    setUserSearch(value);
    setCurrentPage(1);

    if (!Array.isArray(students)) {
      setStudentsList([]);
      return;
    }

    if (!value.trim()) {
      setStudentsList(students);
      return;
    }

    const filteredStudent = students.filter((stu) => {
      if (!stu) return false;
      
      const rollNumber = (stu.rollNumber || '').toLowerCase();
      const name = (stu.name || '').toLowerCase();
      const studentClass = (stu.class || '').toLowerCase();
      const section = (stu.section || '').toLowerCase();
      const searchValue = value.toLowerCase();
      
      return rollNumber.includes(searchValue) ||
             name.includes(searchValue) ||
             studentClass.includes(searchValue) ||
             section.includes(searchValue);
    });
    
    setStudentsList(filteredStudent);
  };

  const clearSearch = () => {
    setUserSearch("");
    setCurrentPage(1);
    setStudentsList(Array.isArray(students) ? students : []);
  };

  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setCurrentPage(1);
    
    if (!Array.isArray(students)) {
      setStudentsList([]);
      return;
    }

    const filteredStudent = students.filter(
      (stu) => stu && stu.class === data.class && stu.section === data.section
    );
    setStudentsList(filteredStudent);
  };

  const clearFilters = () => {
    reset();
    setCurrentPage(1);
    setStudentsList(Array.isArray(students) ? students : []);
  };

  const getStudentStats = () => {
    if (!Array.isArray(students) || students.length === 0) {
      return {
        total: 0,
        male: 0,
        female: 0,
        classes: 0
      };
    }

    const stats = {
      total: students.length,
      male: students.filter(s => s && s.gender === 'Male').length,
      female: students.filter(s => s && s.gender === 'Female').length,
      classes: [...new Set(students.filter(s => s && s.class).map(s => s.class))].length
    };
    return stats;
  };

  const stats = getStudentStats();

  const totalPages = Math.ceil(studentsList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = studentsList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const columns = [
    { 
      header: "Profile", 
      accessor: "profileImage",
      render: (row) => {
        if (!row) return <div>Loading...</div>;
        
        return (
          <div className="flex items-center space-x-3">
            <img 
              src={row.profileImage || 'https://via.placeholder.com/40'} 
              alt={row.name || 'Student'}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40';
              }}
            />
            <div>
              <div className="font-medium text-gray-900">{row.name || 'Unknown'}</div>
              <div className="text-sm text-gray-500">{row.rollNumber || 'N/A'}</div>
            </div>
          </div>
        );
      }
    },
    { header: "Class", accessor: "class" },
    { header: "Section", accessor: "section" },
    { header: "Gender", accessor: "gender" },
    { 
      header: "Guardian", 
      accessor: "guardian",
      render: (row) => row.guardian || 'N/A'
    },
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => {
          setDetailModalOpen(true);
          setStudentId(row.id);
        }}
        className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="View Details"
      >
        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setModalTask("edit");
          setStudentId(row.id);
        }}
        className="p-1.5 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
        title="Edit Student"
      >
        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => {
          setConfirmModalOpen(true);
          setStudentId(row.id);
        }}
        className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete Student"
      >
        <FaTrashAlt className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
            <FaUserGraduate className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <FaUserGraduate className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Student Management</h1>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setModalTask("add");
              setStudentId(null);
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Male Students</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.male}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaMale className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Female Students</p>
                <p className="text-xl sm:text-2xl font-bold text-pink-600">{stats.female}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <FaFemale className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.classes}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaUserFriends className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Search & Filter Students</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
              >
                <FaFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-sm sm:text-base">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={userSearch}
          onChange={filterStudents}
                placeholder="Search by name, roll number, class..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
              {userSearch && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

                        {showFilters && (
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border-2 border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ClassesDropdown register={register} errors={errors} />
            <SectionsDropdown register={register} errors={errors} />
          </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
            type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Apply Filter
                    </button>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
        </form>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Students List</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {studentsList.length} {studentsList.length === 1 ? 'Student' : 'Students'}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {Array.isArray(studentsList) && studentsList.length > 0 ? (
              <Table columns={columns} data={currentPageData} actions={actions} />
            ) : (
              <div className="text-center py-12">
                <FaUserGraduate className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No Students Found</h4>
                <p className="text-gray-500 mb-4">
                  {userSearch || showFilters ? "Try adjusting your search or filter criteria" : "Start by adding your first student"}
                </p>
              </div>
            )}
          </div>

          {Array.isArray(studentsList) && studentsList.length > 0 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center justify-between">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <span className="text-xs sm:text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, studentsList.length)} of {studentsList.length} students
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-gray-700">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FaChevronLeft className="w-3 h-3 sm:mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="hidden sm:flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
                      const shouldShow = 
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      if (!shouldShow && page !== 2 && page !== totalPages - 1) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2 py-1 text-gray-500">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isCurrentPage
                              ? 'bg-red-500 text-white font-semibold'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex sm:hidden items-center space-x-2">
                    <span className="text-xs text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight className="w-3 h-3 sm:ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <StudentModal
          modalTask={modalTask}
          studentId={studentId}
          closeModal={closeModal}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          setConfirmModalOpen={setConfirmModalOpen}
          studentId={studentId}
        />
      )}
      {detailModalOpen && (
        <DetailModal
          studentId={studentId}
          setDetailModalOpen={setDetailModalOpen}
        />
      )}
    </div>
  );
};

export default StudentsList;
