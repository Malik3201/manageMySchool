function ClassCard({ classObj }) {

  const totalStudents = classObj.sections?.reduce((total, section) => {
    return total + (section.students?.length || 0);
  }, 0) || 0;

  return (
    <>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gray-300 blur-sm opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></div>

        <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
              {classObj.className}
            </h2>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">ID: {classObj.id}</span>
              <span className="text-sm font-medium text-blue-600 block">
                {totalStudents} Students
              </span>
            </div>
          </div>

  
          <div className="flex flex-wrap gap-2 mb-3">
            {classObj.sections?.map((sec, i) => (
              <div
                key={i}
                className="flex-1 min-w-[30%] px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 transition"
              >
                <div className="text-center">
                  <div className="font-semibold">Section {sec.section}</div>
                  <div className="text-xs text-gray-500">
                    {sec.students?.length || 0} students
                  </div>
                </div>
              </div>
            )) || (
              <div className="w-full text-center text-gray-500 text-sm py-2">
                No sections available
              </div>
            )}
          </div>

          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{classObj.sections?.length || 0} Sections</span>
              <span>Total: {totalStudents} Students</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassCard;