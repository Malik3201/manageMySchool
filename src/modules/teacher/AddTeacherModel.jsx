import React, { useState } from "react";
import Button from "../../components/Button";

function AddTeacherModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assignedClasses: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeacher = {
      ...formData,
      id: Date.now(),
      assignedClasses: formData.assignedClasses
        .split(",")
        .map((c) => c.trim()),
    };

    onAdd(newTeacher);
    setFormData({ name: "", email: "", phone: "", assignedClasses: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-5 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Add New Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="assignedClasses"
            placeholder="Assigned Classes (comma-separated)"
            value={formData.assignedClasses}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;
