import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addClass } from "../../redux/classSlice";
import { useForm } from "react-hook-form";
import {
  FaSchool,
  FaTimes,
  FaPlus,
  FaSave,
  FaUsers,
  FaList,
  FaInfoCircle
} from "react-icons/fa";

function AddClassModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
    className: "",
    sections: "",
      studentsPerSection: 25
    }
  });

  const watchedValues = watch();

  if (!isOpen) return null;

  const getSectionCount = () => {
    if (watchedValues.sections?.trim()) {
      return watchedValues.sections.split(",").filter(s => s.trim()).length;
    }
    return 1;
  };

  const getTotalStudents = () => {
    return getSectionCount() * (parseInt(watchedValues.studentsPerSection) || 0);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
    let sectionsArray = [];
      const studentCount = parseInt(data.studentsPerSection) || 25;
    
      if (data.sections.trim()) {
        sectionsArray = data.sections
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
        className: data.className,
      sections: sectionsArray,
    };

      await dispatch(addClass(classData));
    onClose();
      reset();
    } catch (error) {
      console.error('Error adding class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add New Class</h2>
                <p className="text-red-100 text-sm">Create a new class with sections</p>
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
                <div className="p-6 space-y-4">
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

          <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaList className="w-4 h-4 text-red-500" />
                      <span>Sections</span>
            </label>
            <input
                      {...register('sections')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      placeholder="A, B, C (comma separated, leave blank for default 'A')"
                    />
                    <p className="mt-1 text-xs text-gray-500 flex items-center">
                      <FaInfoCircle className="w-3 h-3 mr-1" />
                      Leave empty to create a single section 'A' by default
                    </p>
          </div>

          <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaUsers className="w-4 h-4 text-red-500" />
                      <span>Students per Section</span>
            </label>
            <input
                      {...register('studentsPerSection', {
                        min: { value: 1, message: 'Must be at least 1 student' },
                        max: { value: 100, message: 'Cannot exceed 100 students per section' }
                      })}
              type="number"
                      min="1"
                      max="100"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.studentsPerSection
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                      }`}
                      placeholder="25"
                    />
                    {errors.studentsPerSection && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠</span>
                        {errors.studentsPerSection.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
                <div className="text-center">
                  <FaSchool className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-red-700 mb-2">Class Preview</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Sections</div>
                      <div className="text-2xl font-bold text-red-700">{getSectionCount()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Total Students</div>
                      <div className="text-2xl font-bold text-red-700">{getTotalStudents()}</div>
                    </div>
          </div>

                  {watchedValues.sections?.trim() && (
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <h5 className="text-sm font-medium text-red-700 mb-2">Sections to be created:</h5>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {watchedValues.sections.split(",").filter(s => s.trim()).map((section, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300">
                            Section {section.trim().toUpperCase()}
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
                <span>{isSubmitting ? 'Adding...' : 'Add Class'}</span>
              </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassModal; 