import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold">
          <img
            src="/image/img.jpg"
            alt="BerlinGive Logo"
            className="w-32 h-16  mb-4 transition-transform duration-300 hover:rotate-6 drop-shadow-md border border-white/30 rounded-sm"
          />
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-3">
          <Link
            to="/get"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
          >
            Get Free
          </Link>
          <Link
            to="/give"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
          >
            Give Away
          </Link>
          <Link
            to="/map"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
          >
            Map
          </Link>
          


        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {user ? (
            <span className="px-4 py-2 text-white font-medium">
              Hi, {user.firstName}
            </span>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
            >
              Login
            </Link>
          )}
          {user ? (
            <button
              onClick={logOut}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
            >
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
