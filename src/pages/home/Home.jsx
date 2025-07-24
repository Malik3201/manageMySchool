import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-800 drop-shadow-lg transition-all duration-300">
          Welcome to <span className="text-indigo-600">MMS</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto">
          The SmartCampus School Portal – Manage Teachers, Students, Attendance,
          Exams & More.
        </p>

        {/* Call to Action */}
        <div className="mt-6">
          <Link to="/login">
            <Button
              variant="primary"
              className="px-6 py-3 text-lg font-semibold hover:scale-105 transform transition duration-300"
            >
              Log In to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
