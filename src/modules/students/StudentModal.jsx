import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { editStudent, addStudent } from "../../redux/studentsSlice";
import { useEffect } from "react";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";
import { 
  FaUser, 
  FaIdCard, 
  FaVenusMars, 
  FaCalendarAlt, 
  FaUserTie, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera,
  FaTimes,
  FaSave,
  FaPlus
} from "react-icons/fa";

function StudentModal({ modalTask, studentId, closeModal }) {
  const { students } = useSelector((state) => state.studentsSlice);
  const dispatch = useDispatch();
  const currentStudent = students.find((stu) => stu.id == studentId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (modalTask === "edit" && currentStudent) {
      reset(currentStudent);
    } else {
      reset({
        name: "",
        rollNumber: "",
        class: "",
        section: "",
        gender: "",
        dob: "",
        guardian: "",
        contact: "",
        address: "",
        profileImage: "",
      });
    }
  }, [modalTask, currentStudent, reset]);

  const onSubmit = async (data) => {
    try {
      if (modalTask === "add") {
        dispatch(addStudent(data));
      } else {
        dispatch(editStudent(data));
      }
      closeModal();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className={`bg-gradient-to-r ${modalTask === "add" ? "from-red-500 to-red-600" : "from-blue-500 to-blue-600"} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {modalTask === "add" ? (
                <FaPlus className="w-6 h-6 text-white" />
              ) : (
                <FaUser className="w-6 h-6 text-white" />
              )}
              <h2 className="text-2xl font-bold text-white">
                {modalTask === "add" ? "Add New Student" : "Edit Student Details"}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {modalTask === "edit" && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaIdCard className="w-4 h-4" />
                  <span>Student ID</span>
                </label>
                <input
                  type="text"
                  disabled
                  {...register("id")}
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaIdCard className="w-4 h-4 text-gray-600" />
                  <span>Roll Number *</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Roll Number"
                  {...register("rollNumber", { 
                    required: "Roll Number is required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Roll Number should contain only letters and numbers"
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.rollNumber 
                      ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  }`}
                />
                {errors.rollNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.rollNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="w-4 h-4 text-gray-600" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  {...register("name", { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name should be at least 2 characters"
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.name 
                      ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <span>Class *</span>
                </label>
                <ClassesDropdown register={register} errors={errors} />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <span>Section *</span>
                </label>
                <SectionsDropdown register={register} errors={errors} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaVenusMars className="w-4 h-4 text-gray-600" />
                  <span>Gender *</span>
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.gender 
                      ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-gray-600" />
                  <span>Date of Birth *</span>
                </label>
                <input
                  type="date"
                  {...register("dob", { required: "Date of Birth is required" })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.dob 
                      ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  }`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.dob.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaUserTie className="w-4 h-4 text-gray-600" />
                  <span>Guardian Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Guardian Name"
                  {...register("guardian")}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="w-4 h-4 text-gray-600" />
                  <span>Contact Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter Contact Number"
                  {...register("contact", {
                    pattern: {
                      value: /^[0-9+\-\s\(\)]+$/,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.contact 
                      ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-600" />
                <span>Address</span>
              </label>
              <textarea
                placeholder="Enter Full Address"
                rows={3}
                {...register("address")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FaCamera className="w-4 h-4 text-gray-600" />
                <span>Profile Image URL</span>
              </label>
              <input
                type="url"
                placeholder="Enter Profile Image URL"
                {...register("profileImage", {
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i,
                    message: "Please enter a valid image URL"
                  }
                })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  errors.profileImage 
                    ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                  {errors.profileImage.message}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1">Supported formats: JPG, PNG, GIF, BMP, WebP</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                modalTask === "add"
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              } text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaSave className="w-4 h-4" />
              <span>
                {isSubmitting 
                  ? "Saving..." 
                  : modalTask === "add" 
                    ? "Add Student" 
                    : "Update Details"
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;
