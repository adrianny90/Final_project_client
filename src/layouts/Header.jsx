import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto p-3 flex flex-col sm:flex-row justify-between items-center gap-1">
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
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Get Free
          </Link>
          <Link
            to="/give"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Give Away
          </Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {user ? (
            <>
              <span className="px-4 py-2 text-white font-medium">
                Hi, {user.firstName}
              </span>
              <Link
                className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                to="/panel"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Login
            </Link>
          )}
          {user ? (
            <button
              onClick={logOut}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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
