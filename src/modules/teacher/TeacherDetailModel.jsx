import React from "react";
import Button from "../../components/Button";

const TeacherDetailModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  console.log(teacher);
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 animate-fade-in space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Teacher Details</h2>
        </div>

        <div className="flex gap-6">
          <img
            src={teacher.profileImage || "/default-avatar.png"}
            alt={`${teacher.name} profile`}
            className="w-40 h-40 object-cover rounded-xl shadow-md border"
          />

          <div className="flex-1 grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <p className="font-semibold">ID:</p>
              <p>{teacher.id}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{teacher.email}</p>
            </div>
            <div>
              <p className="font-semibold">Name:</p>
              <p>{teacher.name}</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>{teacher.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Classes</p>
              {teacher.assignedClasses.map(e=>{
               return <p>{e}</p>
              })}
            </div>
            <div>
              <p className="font-semibold">Subjects</p>
              {teacher.subjects && teacher.subjects.map(e=>{
               return <p>{e}</p>
              })}
            </div>
            
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailModal;
