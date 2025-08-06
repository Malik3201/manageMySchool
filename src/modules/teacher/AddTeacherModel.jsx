import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacher } from "../../redux/TeacherSlice";
import { getClasses } from "../../redux/classSlice";
import { getClassSectionCombinations, getClassesWithSections } from "../../utils/classUtils";
import { useForm } from "react-hook-form";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaChalkboardTeacher, 
  FaGraduationCap,
  FaTimes,
  FaPlus,
  FaSave,
  FaSearch,
  FaBook,
  FaCheck
} from "react-icons/fa";

function AddTeacherModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classReducer);
  
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    watch 
  } = useForm();

  const subjects = [
    "Mathematics", "English", "Science", "Physics", "Chemistry", 
    "Biology", "History", "Geography", "Literature", "Computer Science",
    "Physical Education", "Art", "Music"
  ];

  useEffect(() => {
    if (isOpen) {
      dispatch(getClasses());
      reset();
      setSelectedClasses([]);
      setSelectedSubjects([]);
    }
  }, [isOpen, dispatch, reset]);

  useEffect(() => {
    const classSectionCombinations = getClassSectionCombinations(classes);
    setAvailableClasses(classSectionCombinations);
  }, [classes]);

  if (!isOpen) return null;

  const filteredClasses = availableClasses.filter(cls =>
    cls.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClassToggle = (className) => {
    setSelectedClasses(prev => {
      const newSelection = prev.includes(className)
        ? prev.filter(c => c !== className)
        : [...prev, className];
      setValue('assignedClasses', newSelection);
      return newSelection;
    });
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => {
      const newSelection = prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject];
      setValue('subjects', newSelection);
      return newSelection;
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const teacherData = {
        ...data,
        assignedClasses: selectedClasses,
        subjects: selectedSubjects,
        profileImage: data.profileImage || null
      };
      
      await dispatch(addTeacher(teacherData));
      onClose();
      reset();
      setSelectedClasses([]);
      setSelectedSubjects([]);
    } catch (error) {
      console.error('Error adding teacher:', error);
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
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add New Teacher</h2>
                <p className="text-red-100 text-sm">Create a new teacher profile</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FaUser className="w-4 h-4 mr-2 text-red-500" />
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="w-4 h-4 text-red-500" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        {...register('name', { 
                          required: 'Full name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.name 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        }`}
                        placeholder="Enter teacher's full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1">⚠</span>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="w-4 h-4 text-red-500" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        }`}
                        placeholder="teacher@school.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1">⚠</span>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="w-4 h-4 text-red-500" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9+\-\s()]+$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        type="tel"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                        }`}
                        placeholder="0300-1234567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 mr-1">⚠</span>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="w-4 h-4 text-red-500" />
                        <span>Profile Image URL</span>
                      </label>
                      <input
                        {...register('profileImage')}
                        type="url"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="mt-1 text-xs text-gray-500">Optional: Provide a URL for the teacher's profile picture</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FaBook className="w-4 h-4 mr-2 text-red-500" />
                      Subjects ({selectedSubjects.length} selected)
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto scrollbar-red-light">
                      {subjects.map((subject) => (
                        <label key={subject} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedSubjects.includes(subject)}
                              onChange={() => handleSubjectToggle(subject)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              selectedSubjects.includes(subject)
                                ? 'bg-red-500 border-red-500'
                                : 'border-gray-300 hover:border-red-300'
                            }`}>
                              {selectedSubjects.includes(subject) && (
                                <FaCheck className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 flex-1">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FaGraduationCap className="w-4 h-4 mr-2 text-red-500" />
                      Assigned Classes ({selectedClasses.length} selected)
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search classes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-1 scrollbar-red-light">
                      {filteredClasses.length > 0 ? (
                        filteredClasses.map((className) => (
                          <label key={className} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedClasses.includes(className)}
                                onChange={() => handleClassToggle(className)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                selectedClasses.includes(className)
                                  ? 'bg-red-500 border-red-500'
                                  : 'border-gray-300 hover:border-red-300'
                              }`}>
                                {selectedClasses.includes(className) && (
                                  <FaCheck className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 flex-1">{className}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          {searchTerm ? 'No classes found matching your search.' : 'No classes available.'}
                        </p>
                      )}
                    </div>

                    {selectedClasses.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Classes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedClasses.map((className) => (
                            <span key={className} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 border border-red-200">
                              {className}
                              <button
                                type="button"
                                onClick={() => handleClassToggle(className)}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
                <span>{isSubmitting ? 'Adding...' : 'Add Teacher'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;
