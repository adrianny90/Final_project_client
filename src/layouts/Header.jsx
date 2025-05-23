import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-black">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            LOGO
          </Link>
          <div className="space-x-4">
            <Link to="/get" className="btn border border-gray-300 rounded-lg">
              Get Free
            </Link>
            <Link to="/give" className="btn border border-gray-300 rounded-lg">
              Give Away
            </Link>
            <Link to="/map" className="btn border border-gray-300 rounded-lg">
              Map
            </Link>
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="btn border border-gray-300 rounded-full"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn border border-gray-300 rounded-full"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
