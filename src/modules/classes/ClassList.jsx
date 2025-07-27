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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Class Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage classes and their sections
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          + Add Class
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading classes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {classes.length > 0 ? (
        <Table
          columns={columns}
          data={classes}
          actions={(row) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(row)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}
        />
      ) : (
        !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No classes found.</p>
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Your First Class
            </Button>
          </div>
        )
      )}

      {/* Add Class Modal */}
      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Edit Class Modal */}
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