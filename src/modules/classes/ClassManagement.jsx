import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/classSlice";
import { useEffect, useState } from "react";
import ClassList from "./ClassList";
import { FaSchool } from "react-icons/fa";

function ClassManagement() {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classReducer);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      dispatch(getClasses());
      setHasInitialized(true);
    }
  }, [dispatch, hasInitialized]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSchool className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Classes</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => setHasInitialized(false)}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading && (!classes || classes.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
            <FaSchool className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-700 font-medium">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="class-management-container">
      <ClassList />
    </div>
  );
}

export default ClassManagement;
