import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-8">
      <aside className="flex flex-wrap justify-center items-center gap-8">
        <p className="text-black font-semibold">
          &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/about"
            className="link link-hover text-black font-semibold"
          >
            About us
          </Link>
          <Link
            to="/about"
            className="link link-hover text-black font-semibold"
          >
            Help
          </Link>
          <Link
            to="/terms"
            className="link link-hover text-black font-semibold"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="link link-hover text-black font-semibold"
          >
            Privacy
          </Link>
        </nav>
      </aside>
    </footer>
  );
};

export default Footer;
