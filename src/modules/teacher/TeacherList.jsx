import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher, getTeachers } from "../../redux/TeacherSlice";
import Button from "../../components/Button";
import Table from "../../components/Table";
import AddTeacherModal from "./AddTeacherModel";
import EditTeacherModel from "./EditTeacherModel";

const TeacherList = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector(
    (state) => state.teacherReducer
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null); 

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Assigned Classes",
      render: (row) => row.assignedClasses?.join(", ") || "None",
    },
  ];

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher); 
    setIsEditModalOpen(true); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-self-end mb-5">
        
        <Button  variant="primary" onClick={() => setIsModalOpen(true)}>
          + Add Teacher
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading teachers...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {teachers.length > 0 ? (
        <Table
          columns={columns}
          data={teachers}
          actions={(row) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(row)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          )}
        />
      ) : (
        !loading && <p className="text-gray-500">No teachers found.</p>
      )}

  
      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    
      {selectedTeacher && (
        <EditTeacherModel
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
};

export default TeacherList;
