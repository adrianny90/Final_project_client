import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
      <aside className="flex flex-wrap justify-center items-center gap-8 text-center">
        <p>&copy; {new Date().getFullYear()} - All rights reserved.</p>
        <nav className="flex gap-4">
          <Link to="/about" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
          <Link to="/about" className="link link-hover">
            Help
          </Link>
          <Link to="/about" className="link link-hover">
            Terms
          </Link>
          <Link to="/about" className="link link-hover">
            Privacy
          </Link>
        </nav>
      </aside>
    </footer>
  );
};

export default Footer;
