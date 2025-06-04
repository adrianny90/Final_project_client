import { useState } from "react";
import ItemGrid from "../components/ItemGrid.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";
import { Link } from "react-router-dom";

const GetFreePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="text-white ">
      <div className="flex flex-col items-center">
        <Link
          to="/map"
          className="px-5 py-3 m-5 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Map
        </Link>
      </div>
      <div className="flex mt-2">
        <CategorySidebar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
        <div className="flex-1">
          <ItemGrid selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
};

export default GetFreePage;
