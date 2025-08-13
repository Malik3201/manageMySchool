import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editClass } from "../../redux/classSlice";
import { useForm } from "react-hook-form";
import {
  FaSchool,
  FaTimes,
  FaEdit,
  FaSave,
  FaUsers,
  FaList,
  FaPlus,
  FaTrashAlt,
  FaInfoCircle
} from "react-icons/fa";

function EditClassModal({ isOpen, onClose, classData }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (classData && isOpen) {
      reset({
        className: classData.className || ""
      });
      setSections(classData.sections?.map(section => ({
        ...section,
        students: [...(section.students || [])]
      })) || []);
    }
  }, [classData, isOpen, reset]);

  if (!isOpen || !classData) return null;

  const addSection = () => {
    const newSection = {
      section: `Section ${String.fromCharCode(65 + sections.length)}`,
      students: Array.from({ length: 25 }, (_, i) => Date.now() + i)
    };
    setSections(prev => [...prev, newSection]);
  };

  const removeSection = (index) => {
    if (sections.length > 1) {
      setSections(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateSectionName = (index, name) => {
    setSections(prev => prev.map((section, i) => 
      i === index ? { ...section, section: name } : section
    ));
  };

  const updateStudentCount = (index, count) => {
    const studentCount = parseInt(count) || 0;
    setSections(prev => prev.map((section, i) => {
      if (i === index) {
          const currentStudents = section.students || [];
        if (studentCount > currentStudents.length) {
          const baseId = Date.now() + (index * 1000);
            const additionalStudents = Array.from(
            { length: studentCount - currentStudents.length }, 
            (_, j) => baseId + currentStudents.length + j
          );
          return { ...section, students: [...currentStudents, ...additionalStudents] };
        } else {
          return { ...section, students: currentStudents.slice(0, studentCount) };
        }
      }
      return section;
    }));
  };

  const getTotalStudents = () => {
    return sections.reduce((total, section) => total + (section.students?.length || 0), 0);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updatedClassData = {
        id: classData.id,
        className: data.className,
        sections: sections
      };

      await dispatch(editClass(updatedClassData));
      onClose();
    } catch (error) {
      console.error('Error updating class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaEdit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit Class</h2>
                <p className="text-red-100 text-sm">Update class information and sections</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-red min-h-0">
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <FaSchool className="w-4 h-4 mr-2 text-red-500" />
                    Class Information
                  </h3>
                </div>
                <div className="p-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaSchool className="w-4 h-4 text-red-500" />
                      <span>Class Name *</span>
                    </label>
          <input
                      {...register('className', {
                        required: 'Class name is required',
                        minLength: { value: 1, message: 'Class name must be at least 1 character' }
                      })}
                      type="text"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.className
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                      }`}
                      placeholder="e.g., Class 10, Grade A, etc."
                    />
                    {errors.className && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠</span>
                        {errors.className.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FaList className="w-4 h-4 mr-2 text-red-500" />
                      Sections ({sections.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addSection}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                    >
                      <FaPlus className="w-3 h-3" />
                      <span>Add Section</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4 max-h-80 overflow-y-auto scrollbar-red-light">
                  {sections.length > 0 ? (
                    sections.map((section, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section Name
                              </label>
              <input
                type="text"
                                value={section.section || ''}
                                onChange={(e) => updateSectionName(index, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                placeholder="Section A"
                              />
            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Student Count
                              </label>
                      <input
                        type="number"
                        min="0"
                                max="100"
                        value={section.students?.length || 0}
                                onChange={(e) => updateStudentCount(index, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                          </div>
                          {sections.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSection(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Remove Section"
                            >
                              <FaTrashAlt className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FaList className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No sections available</p>
                      <button
                        type="button"
                        onClick={addSection}
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        Add First Section
                      </button>
                    </div>
                  )}
                </div>
                    </div>
                    
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
                <div className="text-center">
                  <FaSchool className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-red-700 mb-2">Class Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Sections</div>
                      <div className="text-2xl font-bold text-red-700">{sections.length}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Total Students</div>
                      <div className="text-2xl font-bold text-red-700">{getTotalStudents()}</div>
                    </div>
                  </div>
                  
                  {sections.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <h5 className="text-sm font-medium text-red-700 mb-2">Sections:</h5>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {sections.map((section, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300">
                            {section.section} ({section.students?.length || 0} students)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl flex-shrink-0">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
              >
              Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center space-x-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaSave className="w-4 h-4" />
                <span>{isSubmitting ? 'Updating...' : 'Update Class'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClassModal; 