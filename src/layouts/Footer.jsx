import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
      <aside className="flex flex-wrap justify-center items-center gap-8 text-center">
        <p className="text-black">
          &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link to="/about" className="link link-hover text-black">
            About us
          </Link>
          <Link to="/contact" className="link link-hover text-black">
            Contact
          </Link>
          <Link to="/about" className="link link-hover text-black">
            Help
          </Link>
          <Link to="/terms" className="link link-hover text-black">
            Terms
          </Link>
          <Link to="/privacy" className="link link-hover text-black">
            Privacy
          </Link>
        </nav>
      </aside>
    </footer>
  );
};

export default Footer;
