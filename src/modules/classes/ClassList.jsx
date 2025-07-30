import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, getClasses } from "../../redux/classSlice";
import Button from "../../components/Button";
import Table from "../../components/Table";
import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";

const ClassList = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector(
    (state) => state.classReducer
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const columns = [
    { header: "Class Name", accessor: "className" },
    {
      header: "Sections",
      render: (row) => {
        const sectionsText = row.sections?.map(sec => sec.section).join(", ") || "None";
        return sectionsText;
      },
    },
    {
      header: "Total Students",
      render: (row) => {
        const totalStudents = row.sections?.reduce((total, section) => {
          return total + (section.students?.length || 0);
        }, 0) || 0;
        return totalStudents;
      },
    },
    {
      header: "Sections Count",
      render: (row) => row.sections?.length || 0,
    },
  ];

  const handleEdit = (classData) => {
    setSelectedClass(classData);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class? This action cannot be undone.")) {
      dispatch(deleteClass(id));
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
 
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-1 flex items-center gap-2">
        Class Management
      </h2>
      <p className="text-sm text-gray-500">
        Manage classes and their sections easily.
      </p>
    </div>
    <Button
      variant="primary"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
      onClick={() => setIsAddModalOpen(true)}
    >
      + Add Class
    </Button>
  </div>


  {loading && (
    <p className="text-gray-500 text-center animate-pulse">Loading classes...</p>
  )}
  {error && (
    <p className="text-red-500 text-center font-medium">Error: {error}</p>
  )}

  
  {classes.length > 0 ? (
    <Table
      columns={columns}
      data={classes}
      actions={(row) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-semibold transition"
          >
             Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-md text-sm font-semibold transition"
          >
             Delete
          </button>
        </div>
      )}
    />
  ) : (
    !loading && (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">
          No classes found yet. Start by adding one!
        </p>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + Add Your First Class
        </Button>
      </div>
    )
  )}


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