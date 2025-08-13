import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, getClasses } from "../../redux/classSlice";
import { useForm } from "react-hook-form";
import Table from "../../components/Table";
import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";
import {
  FaSchool,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaUsers,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaUserFriends,
  FaList
} from "react-icons/fa";

const ClassList = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classReducer);

  const [classList, setClassList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const { register, handleSubmit: handleFilterSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(classes)) {
      setClassList(classes);
    }
  }, [classes]);

  const getClassStats = () => {
    if (!Array.isArray(classList)) return { total: 0, totalSections: 0, totalStudents: 0, avgStudentsPerClass: 0 };
    
    const totalClasses = classList.length;
    const totalSections = classList.reduce((sum, cls) => sum + (cls.sections?.length || 0), 0);
    const totalStudents = classList.reduce((sum, cls) => {
      return sum + (cls.sections?.reduce((sectionSum, section) => {
        return sectionSum + (section.students?.length || 0);
      }, 0) || 0);
    }, 0);
    const avgStudentsPerClass = totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;

    return { total: totalClasses, totalSections, totalStudents, avgStudentsPerClass };
  };

  const stats = getClassStats();

  const filterClasses = (searchTerm) => {
    if (!Array.isArray(classes)) return;
    
    if (!searchTerm) {
      setClassList(classes);
      setCurrentPage(1);
      return;
    }

    const filtered = classes.filter((cls) => {
      const searchLower = searchTerm.toLowerCase();
      const className = cls.className?.toLowerCase() || "";
      const sectionsText = cls.sections?.map(s => s.section).join(" ").toLowerCase() || "";
      
      return className.includes(searchLower) || sectionsText.includes(searchLower);
    });

    setClassList(filtered);
    setCurrentPage(1);
  };

  const onSubmit = (data) => {
    if (!Array.isArray(classes)) return;
    
    let filtered = classes;

    if (data.minSections) {
      filtered = filtered.filter(cls => (cls.sections?.length || 0) >= parseInt(data.minSections));
    }

    if (data.maxSections) {
      filtered = filtered.filter(cls => (cls.sections?.length || 0) <= parseInt(data.maxSections));
    }

    setClassList(filtered);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setUserSearch("");
    filterClasses("");
  };

  const clearFilters = () => {
    reset();
    setClassList(Array.isArray(classes) ? classes : []);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(classList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = Array.isArray(classList) ? classList.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const columns = [
    {
      header: "Class Info",
      minWidth: '200px',
      width: '40%',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
            <FaSchool className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 text-sm sm:text-base leading-tight truncate">{row.className || "Unknown Class"}</div>
            <div className="text-xs sm:text-sm text-gray-500 leading-tight">
              {row.sections?.length || 0} section{(row.sections?.length || 0) !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Sections",
      minWidth: '150px',
      width: '35%',
      render: (row) => (
        <div className="space-y-1">
          {row.sections?.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-1">
                {row.sections.slice(0, 3).map((section, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md border border-blue-200">
                    {section.section}
                  </span>
                ))}
              </div>
              {row.sections.length > 3 && (
                <div className="text-xs text-gray-500">+{row.sections.length - 3} more</div>
              )}
            </>
          ) : (
            <span className="text-gray-500 italic text-sm">No sections</span>
          )}
        </div>
      )
    },
    {
      header: "Students",
      minWidth: '120px',
      width: '25%',
      render: (row) => {
        const totalStudents = row.sections?.reduce((total, section) => {
          return total + (section.students?.length || 0);
        }, 0) || 0;
        return (
          <div className="flex items-center space-x-2">
            <FaUsers className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
            <span className="font-medium text-gray-900 text-sm sm:text-base">{totalStudents}</span>
          </div>
        );
      }
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleEdit(row)}
        className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="Edit Class"
      >
        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => handleDelete(row.id)}
        className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete Class"
      >
        <FaTrashAlt className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </>
  );

  const handleEdit = (classData) => {
    setSelectedClass(classData);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class? This action cannot be undone.")) {
      dispatch(deleteClass(id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
            <FaSchool className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-700 font-medium">Loading classes...</p>
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
              <FaSchool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
    <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Class Management</h1>
    </div>
  </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Class</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <FaSchool className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sections</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalSections}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaList className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Students/Class</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.avgStudentsPerClass}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUserFriends className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Search & Filter</h2>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg text-white transition-all duration-200"
              >
                <FaFilter className="w-4 h-4" />
                <span className="text-sm sm:text-base">Filters</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-4 h-4" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value);
                    filterClasses(e.target.value);
                  }}
                  placeholder="Search by class name or sections..."
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30 focus:border-opacity-50 transition-all duration-200"
                />
                {userSearch && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-red-200 transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <form onSubmit={handleFilterSubmit(onSubmit)} className="mt-4 pt-4 border-t border-white border-opacity-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Min Sections</label>
                    <input
                      {...register("minSections")}
                      type="number"
                      min="1"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Max Sections</label>
                    <input
                      {...register("maxSections")}
                      type="number"
                      min="1"
                      className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-opacity-30"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-red-600 px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                  >
                    Apply Filter
          </button>
          <button
                    type="button"
                    onClick={clearFilters}
                    className="w-full sm:w-auto bg-white bg-opacity-20 border border-white border-opacity-30 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200"
          >
                    Clear Filters
          </button>
        </div>
              </form>
            )}
          </div>

          <div className="p-6">
            {Array.isArray(currentPageData) && currentPageData.length > 0 ? (
              <Table
                columns={columns}
                data={currentPageData}
                actions={actions}
    />
  ) : (
              <div className="text-center py-12">
                <FaSchool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Classes Found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first class.</p>
                <button
          onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
                  Add First Class
                </button>
      </div>
            )}

            {Array.isArray(classList) && classList.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, classList.length)} of {classList.length} classes
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Show:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
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
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

  <AddClassModal
    isOpen={isAddModalOpen}
    onClose={() => setIsAddModalOpen(false)}
  />
 
  {selectedClass && (
    <EditClassModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      classData={selectedClass}
    />
  )}
</div>
  );
};

export default ClassList; 