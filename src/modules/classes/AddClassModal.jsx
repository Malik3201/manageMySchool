import React, { useState } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addClass } from "../../redux/classSlice";

function AddClassModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    className: "",
    sections: "",
    studentsPerSection: 25,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    let sectionsArray = [];
    const studentCount = parseInt(formData.studentsPerSection) || 25;
    
    if (formData.sections.trim()) {
      sectionsArray = formData.sections
        .split(",")
        .map((sec, index) => {
          const sectionLetter = sec.trim().toUpperCase();
         
          const baseId = Date.now() + (index * 100);
          const students = Array.from({ length: studentCount }, (_, i) => baseId + i);
          
          return {
            section: sectionLetter,
            students: students,
          };
        });
    } else {
      
      const baseId = Date.now();
      const students = Array.from({ length: studentCount }, (_, i) => baseId + i);
      sectionsArray = [{ 
        section: "A", 
        students: students 
      }];
    }

    const classData = {
      className: formData.className,
      sections: sectionsArray,
    };

    dispatch(addClass(classData));
    onClose();
    setFormData({ className: "", sections: "", studentsPerSection: 25 });
  };


  const getSectionCount = () => {
    if (formData.sections.trim()) {
      return formData.sections.split(",").filter(s => s.trim()).length;
    }
    return 1; 
  };

  const getTotalStudents = () => {
    return getSectionCount() * (parseInt(formData.studentsPerSection) || 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <input
              name="className"
              placeholder="Class Name (e.g., Class 6, Class KG)"
              value={formData.className}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sections
            </label>
            <input
              name="sections"
              placeholder="Sections (comma-separated, e.g., A,B,C) - Leave empty for default A"
              value={formData.sections}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Students per Section
            </label>
            <input
              name="studentsPerSection"
              type="number"
              min="0"
              max="50"
              placeholder="Number of students in each section"
              value={formData.studentsPerSection}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-3 rounded text-sm">
            <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
            <div className="space-y-1 text-gray-600">
              <p>• Class Name: <strong>{formData.className || 'Not specified'}</strong></p>
              <p>• Sections: <strong>{getSectionCount()}</strong> 
                {formData.sections.trim() ? 
                  ` (${formData.sections.split(",").map(s => s.trim().toUpperCase()).join(", ")})` : 
                  ' (A)'
                }
              </p>
              <p>• Students per Section: <strong>{formData.studentsPerSection || 0}</strong></p>
              <p>• Total Students: <strong>{getTotalStudents()}</strong></p>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>• If sections field is empty, section A will be created by default</p>
            <p>• Enter sections separated by commas (e.g., A,B,C)</p>
            <p>• Students will be automatically assigned unique IDs</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassModal; 