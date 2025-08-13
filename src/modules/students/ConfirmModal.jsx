import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { deleteStudent } from "../../redux/studentsSlice";
import { 
  FaExclamationTriangle, 
  FaTimes, 
  FaTrashAlt, 
  FaUserTimes 
} from "react-icons/fa";

const ConfirmModal = ({ setConfirmModalOpen, studentId }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentsSlice);
  const student = students.find((stu) => stu.id == studentId);

  const handleDelete = () => {
    dispatch(deleteStudent(studentId));
    setConfirmModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete Student</h2>
                <p className="text-red-100 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserTimes className="w-8 h-8 text-red-600" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Are you sure you want to delete this student?
            </h3>
            
            {student && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={student.profileImage || 'https://via.placeholder.com/50'} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                    <p className="text-sm text-gray-600">Class {student.class} - {student.section}</p>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 text-sm">
              This will permanently remove the student's record from the system. 
              All associated data will be lost and cannot be recovered.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            
            <button
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <FaTrashAlt className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
