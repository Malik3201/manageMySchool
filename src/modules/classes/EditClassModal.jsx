import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { editClass, addSection, deleteSection } from "../../redux/classSlice";

function EditClassModal({ isOpen, onClose, classData }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    className: "",
    sections: [],
  });
  const [newSectionName, setNewSectionName] = useState("");

  useEffect(() => {
    if (classData) {
      
      const clonedSections = classData.sections?.map(section => ({
        ...section,
        students: [...(section.students || [])]
      })) || [];
      
      setFormData({
        className: classData.className,
        sections: clonedSections,
      });
    }
  }, [classData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentCountChange = (sectionIndex, newCount) => {
    const count = parseInt(newCount) || 0;
    setFormData((prev) => {
  
      const updatedSections = prev.sections.map((section, index) => {
        if (index === sectionIndex) {
          const currentStudents = section.students || [];
          let newStudents = [...currentStudents];
          
          if (count > currentStudents.length) {
      
            const maxId = currentStudents.length > 0 ? Math.max(...currentStudents) : 0;
            const startId = maxId + 1;
            const additionalStudents = Array.from(
              { length: count - currentStudents.length }, 
              (_, i) => startId + i
            );
            newStudents = [...currentStudents, ...additionalStudents];
          } else if (count < currentStudents.length) {
     
            newStudents = currentStudents.slice(0, count);
          }
          
          return {
            ...section,
            students: newStudents
          };
        }
        return {
          ...section,
          students: [...section.students] 
        };
      });
      
      return { ...prev, sections: updatedSections };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedClass = {
      id: classData.id,
      className: formData.className,
      sections: formData.sections,
    };

    dispatch(editClass(updatedClass));
    onClose();
  };

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const sectionExists = formData.sections.some(
        (sec) => sec.section.toUpperCase() === newSectionName.toUpperCase()
      );
      
      if (!sectionExists) {
        const newSection = {
          section: newSectionName.toUpperCase(),
          students: [],
        };
        
        setFormData((prev) => ({
          ...prev,
          sections: [...prev.sections, newSection],
        }));
      
        dispatch(addSection({
          classId: classData.id,
          sectionName: newSectionName.toUpperCase(),
        }));
        
        setNewSectionName("");
      } else {
        alert("Section already exists!");
      }
    }
  };

  const handleDeleteSection = (sectionName) => {
    if (formData.sections.length <= 1) {
      alert("A class must have at least one section!");
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((sec) => sec.section !== sectionName),
    }));
    

    dispatch(deleteSection({
      classId: classData.id,
      sectionName: sectionName,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800">Edit Class</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Sections & Student Count</h3>
            
 
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Section Name (e.g., A, B, C)"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleAddSection}
                className="text-sm px-3 py-2"
              >
                Add Section
              </Button>
            </div>

        
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded border"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="font-medium min-w-[80px]">
                      Section {section.section}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Students:</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={section.students?.length || 0}
                        onChange={(e) => handleStudentCountChange(index, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {section.students?.length > 0 && (
                        <span>
                          IDs: {section.students?.slice(0, 3).join(', ')}
                          {section.students?.length > 3 && '...'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteSection(section.section)}
                    className="text-xs px-2 py-1"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>

         
            <div className="bg-blue-50 p-3 rounded text-sm">
              <p className="text-blue-800">
                <strong>Total Students in Class:</strong> {' '}
                {formData.sections.reduce((total, section) => 
                  total + (section.students?.length || 0), 0
                )}
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Students are automatically assigned unique IDs when you increase the count
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClassModal; 