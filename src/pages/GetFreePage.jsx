import { useState } from "react";
import { Link } from "react-router-dom";
import ItemGrid from "../components/ItemGrid.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";

const GetFreePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="">
      <div className="px-8">
        <Link
          to="/request"
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Request
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
