import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold py-4">Welcome to Our Community</h1>
      <p className="py-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi omnis
        quas architecto reprehenderit molestiae alias aut modi repellat qui
        officia rem, animi pariatur enim ad repellendus voluptates odio ullam
        suscipit.
      </p>
      <div className="py-6">
        <Link to="/give" className="btn border border-gray-300 rounded-full">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
