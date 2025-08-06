import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { 
  FaUser, 
  FaIdCard, 
  FaVenusMars, 
  FaCalendarAlt, 
  FaUserTie, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaTimes,
  FaGraduationCap,
  FaUserCircle,
  FaInfoCircle
} from "react-icons/fa";

const DetailModal = ({ studentId, setDetailModalOpen }) => {
  const { students } = useSelector((state) => state.studentsSlice);
  const student = students.find((stu) => stu.id == studentId);
  
  if (!student) return null;

  const getAgeFromDOB = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">Student Profile</h2>
                <p className="text-blue-100 text-sm">Detailed Information</p>
              </div>
            </div>
            <button
              onClick={() => setDetailModalOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={student.profileImage || 'https://via.placeholder.com/200'}
                    alt={`${student.name} profile`}
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <FaGraduationCap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                <p className="text-blue-600 font-medium mb-2">Roll No: {student.rollNumber}</p>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Class {student.class}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Section {student.section}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaInfoCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Personal Information</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaIdCard className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Student ID</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.id}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaVenusMars className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Gender</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.gender || 'N/A'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaCalendarAlt className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.dob || 'N/A'}</p>
                      {student.dob && (
                        <p className="text-sm text-gray-500">Age: {getAgeFromDOB(student.dob)} years</p>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaGraduationCap className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Academic Info</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        Class {student.class} - {student.section}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FaUserTie className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Contact Information</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaUserTie className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Guardian Name</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.guardian || 'N/A'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaPhone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Contact Number</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.contact || 'N/A'}</p>
                    </div>

                    <div className="md:col-span-2 bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Address</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaGraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-blue-900 mb-2">Academic Journey</h4>
                    <p className="text-blue-700">
                      {student.name} is currently enrolled in Class {student.class}, Section {student.section}
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      Student ID: {student.rollNumber} • Enrolled in our institution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={() => setDetailModalOpen(false)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center space-x-2"
            >
              <FaTimes className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
