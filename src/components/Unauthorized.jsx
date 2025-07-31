const NotAuthorized = () => {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-50 via-white to-red-100 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-200">
      <div className="text-red-500 text-5xl mb-4">⛔</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600">
        You are <span className="font-semibold text-red-600">not authorized</span> to access this page.
      </p>
    </div>
  </div>
);

};

export default NotAuthorized;
