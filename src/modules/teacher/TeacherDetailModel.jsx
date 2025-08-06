import React from "react";
import { 
  FaUser, 
  FaIdCard, 
  FaEnvelope, 
  FaPhone, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaBook, 
  FaTimes,
  FaUserCircle,
  FaInfoCircle
} from "react-icons/fa";

const TeacherDetailModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in scrollbar-red">
        <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaChalkboardTeacher className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Teacher Details</h2>
                <p className="text-red-100 text-sm">Complete teacher information</p>
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

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center border border-red-200">
                <div className="relative inline-block mb-4">
                  <img
                    src={teacher.profileImage || 'https://ui-avatars.com/api/?name=' + (teacher.name || 'Teacher') + '&background=random&color=fff&size=150'}
                    alt={teacher.name || 'Teacher'}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=' + (teacher.name || 'Teacher') + '&background=random&color=fff&size=150';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaUserCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name || 'Unknown Teacher'}</h3>
                <p className="text-red-600 font-medium">{teacher.email || 'No email provided'}</p>
                <div className="mt-4 pt-4 border-t border-red-200">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <FaInfoCircle className="w-4 h-4 text-red-500" />
                    <span>Teacher ID: {teacher.id || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <FaUser className="w-4 h-4 mr-2 text-red-500" />
                    Personal Information
                  </h4>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaIdCard className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                    </div>
                    <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                      {teacher.name || 'Not provided'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                    </div>
                    <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                      {teacher.email || 'Not provided'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaPhone className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    </div>
                    <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                      {teacher.phone || 'Not provided'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaIdCard className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Teacher ID</label>
                    </div>
                    <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                      {teacher.id || 'Not assigned'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 rounded-t-xl">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <FaBook className="w-4 h-4 mr-2 text-red-500" />
                    Teaching Information
                  </h4>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FaBook className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Subjects Taught</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects && teacher.subjects.length > 0 ? (
                        teacher.subjects.map((subject, index) => (
                          <span key={index} className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg border border-blue-200">
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg">No subjects assigned</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FaGraduationCap className="w-4 h-4 text-red-500" />
                      <label className="text-sm font-medium text-gray-600">Assigned Classes</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.assignedClasses && teacher.assignedClasses.length > 0 ? (
                        teacher.assignedClasses.map((className, index) => (
                          <span key={index} className="px-3 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-200">
                            {className}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg">No classes assigned</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
                <div className="text-center">
                  <FaChalkboardTeacher className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-red-700 mb-2">Teaching Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Subjects</div>
                      <div className="text-2xl font-bold text-red-700">
                        {teacher.subjects ? teacher.subjects.length : 0}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-600">Classes</div>
                      <div className="text-2xl font-bold text-red-700">
                        {teacher.assignedClasses ? teacher.assignedClasses.length : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailModal;
