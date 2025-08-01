const Table = ({ columns = [], data = [], actions }) => {
  return (
    <div className="overflow-x-auto w-full rounded-md shadow border border-gray-200">
      <table className="min-w-full bg-white text-sm text-gray-700">
        <thead className="bg-gray-100 text-left text-xs uppercase text-gray-500">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 whitespace-nowrap">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center p-4 text-gray-400"
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-t border-gray-100 hover:bg-gray-50 ${
                  row.status === "present"
                    ? "bg-green-100"
                    : row.status === "absent"
                    ? "bg-red-100"
                    : ""
                }`}
              >
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 whitespace-nowrap space-x-2">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
