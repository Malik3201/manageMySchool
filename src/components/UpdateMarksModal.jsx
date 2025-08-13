import { useEffect } from "react";
import { useForm } from "react-hook-form";


const UpdateMarksModal = ({ isOpen, onClose, student, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
  defaultValues: {
    marks: student?.marks || "",
  },
});

useEffect(() => {
  reset({ marks: student?.marks || "" });
}, [student, reset]);


  const submitHandler = (data) => {

    onSave(student.id, data.marks);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative">
        <h2 className="text-xl font-bold mb-4">Update Marks</h2>
        <p className="text-gray-600 mb-4">
          Student: <span className="font-medium">{student?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <input
            type="number"
            {...register("marks", { required: true, min: 0 })}
            placeholder="Enter Marks"
            className="border border-gray-300 rounded-lg p-2 focus:outline-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMarksModal;
