import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTeacher } from "../../redux/TeacherSlice";
import Button from "../../components/Button";

function EditTeacherModel({isOpen, onClose,teacher}){
  const dispatch = useDispatch();
  const  [editData, setEditData] = useState({
    id : teacher.id,
    name: teacher.name,
    email: teacher.email,
    phone: teacher.phone,
    assignedClasses: teacher.assignedClasses,
  });
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
      e.preventDefault();
  
      
  
      dispatch(editTeacher(editData)); 
      onClose();  
    };


 
return(
<>
<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={editData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={editData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={editData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="assignedClasses"
            placeholder="Assigned Classes (comma-separated)"
            value={editData.assignedClasses}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
</>)
}export default EditTeacherModel;