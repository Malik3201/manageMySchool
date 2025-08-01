import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { editStudent, addStudent } from "../../redux/studentsSlice";
import { useEffect } from "react";
import ClassesDropdown from "../../components/ClassesDropdown";
import SectionsDropdown from "../../components/SectionsDropdown";

function StudentModal({ modalTask, studentId, closeModal }) {
  const { students } = useSelector((state) => state.studentsSlice);
  const dispatch = useDispatch();
  const currentStudent = students.find((stu) => stu.id == studentId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = (data) => {
    if (modalTask === "add") {
      dispatch(addStudent(data));
    } else {
      dispatch(editStudent(data));
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-5 animate-fade-in overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-800">
          {modalTask === "add" ? "Add New Student" : "Edit Student Details"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {modalTask === "edit" && (
            <input
              type="text"
              placeholder="ID"
              disabled
              {...register("id")}
              className="w-full px-4 py-2 border rounded-md"
            />
          )}

          <input
            type="text"
            placeholder="Enter Roll Number"
            {...register("rollNumber", { required: "Roll Number is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.rollNumber && (
            <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>
          )}

          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Class & Section dropdowns auto-select based on reset values */}
          <ClassesDropdown register={register} errors={errors} />
          <SectionsDropdown register={register} errors={errors} />

          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Guardian Name"
            {...register("guardian")}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Contact Number"
            {...register("contact")}
            className="w-full px-4 py-2 border rounded-md"
          />

          <textarea
            placeholder="Address"
            {...register("address")}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Profile Image URL"
            {...register("profileImage")}
            className="w-full px-4 py-2 border rounded-md"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {modalTask === "add" ? "Add Student" : "Update Details"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;
