import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { deleteStudent } from "../../redux/studentsSlice";
const ConfirmModal = ({ setConfirmModalOpen, studentId }) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-5 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">
          Are you sure, you want yo delete ?
        </h2>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setConfirmModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              dispatch(deleteStudent(studentId));
              setConfirmModalOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
