import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import AddTeacherModel from "./AddTeacherModel";


const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

 
  useEffect(() => {
    fetch("/data/teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Failed to load teachers:", err));
  }, []);

 
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Assigned Classes",
      render: (row) => row.assignedClasses?.join(", ") || "None",
    },
  ];


  const handleAddTeacher = (newTeacher) => {
    setTeachers((prev) => [...prev, newTeacher]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Teacher Management</h2>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Add Teacher
        </Button>
      </div>

      {teachers.length > 0 ? (
        <Table columns={columns} data={teachers} />
      ) : (
        <p className="text-gray-500">No teachers found.</p>
      )}

  
      <AddTeacherModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTeacher}
      />
    </div>
  );
};

export default TeacherList;
