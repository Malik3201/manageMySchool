import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher, getTeachers } from "../../redux/TeacherSlice";
import Table from "../../components/Table";
import AddTeacherModal from "./AddTeacherModel";
import EditTeacherModel from "./EditTeacherModel";
import TeacherDetailModal from "./TeacherDetailModel";
import { useForm } from "react-hook-form";
import { 
  FaChalkboardTeacher, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaEye,
  FaUsers,
  FaUserTie,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaBook
} from "react-icons/fa";

const TeacherList = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teacherReducer);

  const [teachersList, setTeachersList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    setTeachersList(Array.isArray(teachers) ? teachers : []);
  }, [teachers]);

  const getTeacherStats = () => {
    if (!Array.isArray(teachers) || teachers.length === 0) {
      return {
        total: 0,
        subjects: 0,
        classes: 0,
        avgClassesPerTeacher: 0
      };
    }

    const totalClasses = teachers.reduce((acc, teacher) => {
      return acc + (teacher.assignedClasses?.length || 0);
    }, 0);

    const allSubjects = new Set();
    teachers.forEach(teacher => {
      if (teacher.subjects) {
        teacher.subjects.forEach(subject => allSubjects.add(subject));
      }
    });

    const stats = {
      total: teachers.length,
      subjects: allSubjects.size,
      classes: totalClasses,
      avgClassesPerTeacher: teachers.length ? Math.round(totalClasses / teachers.length * 10) / 10 : 0
    };
    return stats;
  };

  const stats = getTeacherStats();

  const totalPages = Math.ceil(teachersList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = teachersList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const filterTeachers = (e) => {
    const value = e.target.value;
    setUserSearch(value);
    setCurrentPage(1);

    if (!Array.isArray(teachers)) {
      setTeachersList([]);
      return;
    }

    if (!value.trim()) {
      setTeachersList(teachers);
      return;
    }

    const filteredTeachers = teachers.filter((teacher) => {
      if (!teacher) return false;
      
      const name = (teacher.name || '').toLowerCase();
      const email = (teacher.email || '').toLowerCase();
      const phone = (teacher.phone || '').toLowerCase();
      const subjects = (teacher.subjects || []).join(' ').toLowerCase();
      const classes = (teacher.assignedClasses || []).join(' ').toLowerCase();
      const searchValue = value.toLowerCase();
      
      return name.includes(searchValue) ||
             email.includes(searchValue) ||
             phone.includes(searchValue) ||
             subjects.includes(searchValue) ||
             classes.includes(searchValue);
    });
    
    setTeachersList(filteredTeachers);
  };

  const onSubmit = (data) => {
    setCurrentPage(1);
    
    if (!Array.isArray(teachers)) {
      setTeachersList([]);
      return;
    }

    const filteredTeachers = teachers.filter(
      (teacher) => teacher && 
      (data.subject ? teacher.subjects?.includes(data.subject) : true) &&
      (data.assignedClass ? teacher.assignedClasses?.includes(data.assignedClass) : true)
    );
    setTeachersList(filteredTeachers);
  };

  const clearSearch = () => {
    setUserSearch("");
    setCurrentPage(1);
    setTeachersList(Array.isArray(teachers) ? teachers : []);
  };

  const clearFilters = () => {
    reset();
    setCurrentPage(1);
    setTeachersList(Array.isArray(teachers) ? teachers : []);
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
              src={row.profileImage || 'https://ui-avatars.com/api/?name=' + (row.name || 'Teacher') + '&background=random&color=fff&size=40'} 
              alt={row.name || 'Teacher'}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=' + (row.name || 'Teacher') + '&background=random&color=fff&size=40';
              }}
            />
            <div>
              <div className="font-medium text-gray-900">{row.name || 'Unknown'}</div>
              <div className="text-sm text-gray-500">{row.email || 'N/A'}</div>
            </div>
          </div>
        );
      }
    },
    { header: "Phone", accessor: "phone" },
    { 
      header: "Subjects", 
      accessor: "subjects",
      render: (row) => {
        const subjects = row.subjects || [];
        return (
          <div className="flex flex-wrap gap-1">
            {subjects.map((subject, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {subject}
              </span>
            ))}
          </div>
        );
      }
    },
    { 
      header: "Classes", 
      accessor: "assignedClasses",
      render: (row) => {
        const classes = row.assignedClasses || [];
        return (
          <div className="flex flex-wrap gap-1">
            {classes.map((className, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {className}
              </span>
            ))}
          </div>
        );
      }
    },
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => {
          setSelectedTeacher(row);
          setDetailModalOpen(true);
        }}
        className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="View Details"
      >
        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => {
          setSelectedTeacher(row);
          setIsEditModalOpen(true);
        }}
        className="p-1.5 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
        title="Edit Teacher"
      >
        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this teacher?')) {
            dispatch(deleteTeacher(row.id));
          }
        }}
        className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete Teacher"
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
            <FaChalkboardTeacher className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading teachers...</p>
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
              <FaChalkboardTeacher className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Teacher Management</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Teacher</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Subjects Taught</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.subjects}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaBook className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.classes}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Classes/Teacher</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.avgClassesPerTeacher}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <FaUserTie className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Search & Filter Teachers</h2>
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
                onChange={filterTeachers}
                placeholder="Search by name, email, phone, subjects, or classes..."
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select {...register("subject")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option value="">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="Science">Science</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                        <option value="Literature">Literature</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Class</label>
                      <select {...register("assignedClass")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option value="">All Classes</option>
                        <option value="Class 6 - A">Class 6 - A</option>
                        <option value="Class 6 - B">Class 6 - B</option>
                        <option value="Class 7 - A">Class 7 - A</option>
                        <option value="Class 7 - B">Class 7 - B</option>
                        <option value="Class 8 - A">Class 8 - A</option>
                        <option value="Class 8 - B">Class 8 - B</option>
                        <option value="Class 9 - A">Class 9 - A</option>
                        <option value="Class 9 - B">Class 9 - B</option>
                        <option value="Class 10 - A">Class 10 - A</option>
                        <option value="Class 10 - B">Class 10 - B</option>
                      </select>
                    </div>
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
              <h3 className="text-xl font-bold text-gray-900">Teachers List</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {teachersList.length} {teachersList.length === 1 ? 'Teacher' : 'Teachers'}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {Array.isArray(teachersList) && teachersList.length > 0 ? (
              <Table columns={columns} data={currentPageData} actions={actions} />
            ) : (
              <div className="text-center py-12">
                <FaChalkboardTeacher className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No Teachers Found</h4>
                <p className="text-gray-500 mb-4">
                  {userSearch || showFilters ? "Try adjusting your search or filter criteria" : "Start by adding your first teacher"}
                </p>
              </div>
            )}
          </div>

          {Array.isArray(teachersList) && teachersList.length > 0 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center justify-between">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <span className="text-xs sm:text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, teachersList.length)} of {teachersList.length} teachers
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

      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedTeacher && (
        <EditTeacherModel
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTeacher(null);
          }}
          teacher={selectedTeacher}
        />
      )}

      {detailModalOpen && selectedTeacher && (
        <TeacherDetailModal
          teacher={selectedTeacher}
          onClose={() => {
            setDetailModalOpen(false);
            setSelectedTeacher(null);
          }}
        />
      )}
    </div>
  );
};

export default TeacherList; 
 