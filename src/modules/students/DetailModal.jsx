import { useSelector } from "react-redux";
import Button from "../../components/Button";

const DetailModal = ({ studentId, setDetailModalOpen }) => {
  const { students } = useSelector((state) => state.studentsSlice);
  const student = students.find((stu) => stu.id == studentId);
  
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 animate-fade-in space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
        </div>
        <div className="flex gap-6">
          <img
            src={student.profileImage}
            alt={`${student.name} profile`}
            className="w-40 h-40 object-cover rounded-xl shadow-md border"
          />

          <div className="flex-1 grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <p className="font-semibold">ID:</p>
              <p>{student.id}</p>
            </div>
            <div>
              <p className="font-semibold">Roll Number:</p>
              <p>{student.rollNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Name:</p>
              <p>{student.name}</p>
            </div>
            <div>
              <p className="font-semibold">Class:</p>
              <p>{student.class}</p>
            </div>
            <div>
              <p className="font-semibold">Section:</p>
              <p>{student.section}</p>
            </div>
            <div>
              <p className="font-semibold">Gender:</p>
              <p>{student.gender}</p>
            </div>
            <div>
              <p className="font-semibold">Date of Birth:</p>
              <p>{student.dob}</p>
            </div>
            <div>
              <p className="font-semibold">Guardian:</p>
              <p>{student.guardian}</p>
            </div>
            <div>
              <p className="font-semibold">Contact:</p>
              <p>{student.contact}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Address:</p>
              <p>{student.address}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t pt-4">
          <Button variant="secondary" onClick={() => setDetailModalOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
