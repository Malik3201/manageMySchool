import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/classSlice";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import ClassList from "./ClassList";
import Button from "../../components/Button";

function ClassManagement() {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classReducer);
  const [viewType, setViewType] = useState("table");
  const [hasInitialized, setHasInitialized] = useState(false);


  useEffect(() => {
    if (!hasInitialized) {
      console.log("ClassManagement: Dispatching getClasses...");
      dispatch(getClasses());
      setHasInitialized(true);
    }
  }, [dispatch, hasInitialized]);


  useEffect(() => {
    console.log("ClassManagement state changed:", { 
      classesCount: classes?.length || 0, 
      loading, 
      error,
      firstClass: classes?.[0]?.className || 'None'
    });
  }, [classes.length, loading, error]); 


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Classes</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            variant="primary" 
            onClick={() => {
              setHasInitialized(false); 
            }}
          >
            Try Again
          </Button>
          <div className="mt-4 text-sm text-gray-500">
            <p>If error persists, classes from localStorage will be used.</p>
          </div>
        </div>
      </div>
    );
  }


  if (loading && (!classes || classes.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading classes...</p>
          <p className="text-sm text-gray-400 mt-2">Fetching classes data from server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
   
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
                Class Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all classes and their sections in your school
                {classes?.length > 0 && ` (${classes.length} classes loaded)`}
              </p>
            </div>
     
            {/* <div className="flex bg-gray-200 rounded-lg p-1">
              <Button
                variant={viewType === "table" ? "primary" : "outline"}
                onClick={() => setViewType("table")}
                className="text-sm px-4 py-2 rounded-md"
              >
                 Table View
              </Button>
              <Button
                variant={viewType === "cards" ? "primary" : "outline"}
                onClick={() => setViewType("cards")}
                className="text-sm px-4 py-2 rounded-md ml-1"
              >
                 Card View
              </Button>
            </div> */}
          </div>
        </div>

       
        <div className="bg-white shadow-sm rounded-xl border border-gray-200">
          {viewType === "table" ? (
            <ClassList />
          ) : (
            <div className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Classes Overview
                </h2>
                <p className="text-gray-500">
                  {classes && classes.length > 0 
                    ? `${classes.length} classes found` 
                    : "No classes available"
                  }
                </p>
              </div>
              
              {classes && classes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {classes.map((classObj, index) => (
                    <ClassCard key={classObj.id || index} classObj={classObj} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No Classes Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Switch to Table View to add your first class
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setViewType("table")}
                  >
                    Go to Table View
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ClassManagement;
