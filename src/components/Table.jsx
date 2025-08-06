const Table = ({ columns = [], data = [], actions }) => {
  return (
    <div className="w-full">
      <div className="block sm:hidden text-xs text-gray-500 mb-2 px-2 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Scroll horizontally to view all columns
      </div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 scrollbar-red-light">
        <div className="min-w-full">
          <table className="w-full bg-white text-gray-700 table-auto" style={{ minWidth: '600px' }}>
          <thead className="bg-gray-100 text-left text-xs uppercase text-gray-500 border-b border-gray-200">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider"
                  style={{ 
                    minWidth: col.minWidth || '120px',
                    width: col.width || 'auto'
                  }}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th 
                  className="px-3 sm:px-4 py-3 font-semibold tracking-wider text-center"
                  style={{ minWidth: '120px', width: '140px' }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center p-8 text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    row.status === "present"
                      ? "bg-green-50"
                      : row.status === "absent"
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                >
                  {columns.map((col, i) => (
                    <td 
                      key={i} 
                      className="px-3 sm:px-4 py-3 text-sm text-gray-900"
                      style={{ 
                        minWidth: col.minWidth || '120px',
                        width: col.width || 'auto'
                      }}
                    >
                      <div className="break-words">
                        {col.render ? col.render(row) : row[col.accessor]}
                      </div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-3 sm:px-4 py-3" style={{ minWidth: '120px', width: '140px' }}>
                      <div className="flex justify-center items-center space-x-1 lg:space-x-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
