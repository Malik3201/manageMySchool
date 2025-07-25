import TeacherList from "./TeacherList";

function TeacherManagement() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
            Teacher Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View, edit, and manage all registered teachers.
          </p>
        </div>


        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <TeacherList />
        </div>
      </div>
    </div>
  );
}

export default TeacherManagement;
