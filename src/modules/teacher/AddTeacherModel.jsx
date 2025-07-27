import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTeacher } from "../../redux/TeacherSlice";
import { getClasses } from "../../redux/classSlice";
import { getClassSectionCombinations, getClassesWithSections } from "../../utils/classUtils";

function AddTeacherModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classReducer);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assignedClasses: [],
  });
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classesWithSections, setClassesWithSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");


  useEffect(() => {
    if (isOpen) {
      dispatch(getClasses());
    }
  }, [isOpen, dispatch]);


  useEffect(() => {
    const classSectionCombinations = getClassSectionCombinations(classes);
    const classesWithSectionsData = getClassesWithSections(classes);
    setAvailableClasses(classSectionCombinations);
    setClassesWithSections(classesWithSectionsData);
  }, [classes]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassSelection = (classSection) => {
    setFormData((prev) => {
      const isSelected = prev.assignedClasses.includes(classSection);
      if (isSelected) {
        // Remove from selection
        return {
          ...prev,
          assignedClasses: prev.assignedClasses.filter(cls => cls !== classSection)
        };
      } else {
        // Add to selection
        return {
          ...prev,
          assignedClasses: [...prev.assignedClasses, classSection]
        };
      }
    });
  };

  const handleSelectAllForClass = (className) => {
    const classData = classesWithSections.find(cls => cls.className === className);
    if (classData) {
      const classSections = classData.sections.map(section => `${className} - ${section}`);
      setFormData((prev) => {

        const allSelected = classSections.every(cs => prev.assignedClasses.includes(cs));
        
        if (allSelected) {
     
          return {
            ...prev,
            assignedClasses: prev.assignedClasses.filter(cls => 
              !classSections.includes(cls)
            )
          };
        } else {
       
          const newSelections = classSections.filter(cs => 
            !prev.assignedClasses.includes(cs)
          );
          return {
            ...prev,
            assignedClasses: [...prev.assignedClasses, ...newSelections]
          };
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const teacherData = {
      ...formData,
      assignedClasses: formData.assignedClasses,
    };

    dispatch(addTeacher(teacherData));
    onClose();
    setFormData({ name: "", email: "", phone: "", assignedClasses: [] });
    setSearchTerm("");
    setSelectedClass("all");
  };

  
  const filteredClasses = availableClasses.filter(classSection => {
    const matchesSearch = classSection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || classSection.startsWith(selectedClass);
    return matchesSearch && matchesClass;
  });


  const uniqueClassNames = [...new Set(availableClasses.map(cs => cs.split(' - ')[0]))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800">Add New Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

 
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Assign Classes & Sections
              </label>
              <span className="text-xs text-gray-500">
                {formData.assignedClasses.length} classes selected
              </span>
            </div>
            
     
            {formData.assignedClasses.length > 0 && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-800 mb-2">Selected Classes:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.assignedClasses.map((classSection, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {classSection}
                      <button
                        type="button"
                        onClick={() => handleClassSelection(classSection)}
                        className="ml-2 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}


            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                {uniqueClassNames.map((className, index) => (
                  <option key={index} value={className}>{className}</option>
                ))}
              </select>
            </div>

           
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Available Classes & Sections
                  </p>
                  <p className="text-xs text-gray-500">
                    {filteredClasses.length} of {availableClasses.length} shown
                  </p>
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {availableClasses.length > 0 ? (
                  <div className="p-3">
              
                    {uniqueClassNames
                      .filter(className => 
                        selectedClass === "all" || selectedClass === className
                      )
                      .map((className, classIndex) => {
                        const classSections = availableClasses.filter(cs => 
                          cs.startsWith(className) && 
                          cs.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        
                        if (classSections.length === 0) return null;
                        
                        const allSelected = classSections.every(cs => 
                          formData.assignedClasses.includes(cs)
                        );
                        
                        return (
                          <div key={classIndex} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-800">{className}</h4>
                              <button
                                type="button"
                                onClick={() => handleSelectAllForClass(className)}
                                className={`text-xs px-2 py-1 rounded ${
                                  allSelected 
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                                }`}
                              >
                                {allSelected ? 'Deselect All' : 'Select All'}
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-1">
                              {classSections.map((classSection, index) => (
                                <label
                                  key={index}
                                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.assignedClasses.includes(classSection)}
                                    onChange={() => handleClassSelection(classSection)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700 flex-1">
                                    {classSection}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No classes available. Please add classes first.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;
