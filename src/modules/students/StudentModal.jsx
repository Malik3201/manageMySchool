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
      reset({
        id: currentStudent.id,
        name: currentStudent.name,
        rollNumber: currentStudent.rollNumber,
        class: currentStudent.class,
        section: currentStudent.section,
      });
    }
  }, [modalTask, currentStudent, reset]);

  const onAddStudent = (data) => {
    dispatch(addStudent(data));
    closeModal();
  };

  const onEditStudent = (data) => {
    dispatch(editStudent(data));
    closeModal();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-5 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">
          {modalTask === "add" ? "Add New Student" : "Edit Student Details"}
        </h2>
        <form
          onSubmit={handleSubmit(
            modalTask == "add" ? onAddStudent : onEditStudent
          )}
          className="space-y-4"
        >
          {modalTask === "edit" ? (
            <input
              type="text"
              placeholder="Enter Id"
              disabled
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("id", { required: "Id is required" })}
            />
          ) : null}
          <input
            type="text"
            placeholder="Enter Roll Number"
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("rollNumber", { required: "Roll Number is required" })}
          />
          {errors.rollNumber && (
            <p className="text-sm text-red-500">{errors.rollNumber.message}</p>
          )}

          <input
            type="text"
            placeholder="Enter Name"
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <ClassesDropdown register={register} errors={errors} />

          <SectionsDropdown register={register} errors={errors} />

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
