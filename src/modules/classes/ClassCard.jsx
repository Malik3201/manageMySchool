function ClassCard({classObj}){

return(<>
     <div className="relative group">
  <div className="absolute -inset-1 bg-gray-300 blur-sm opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></div>

  <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300 w-full">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
         {classObj.className}
      </h2>
      <span className="text-sm text-gray-500">ID: {classObj.id}</span>
    </div>

    <div className="flex flex-wrap gap-3">
      {classObj.sections.map((sec, i) => (
        <button
          key={i}
          className="flex-1 min-w-[30%] px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 transition"
        >
          Section {sec.section}
        </button>
      ))}
    </div>
  </div>
</div>


</>)
}export default ClassCard