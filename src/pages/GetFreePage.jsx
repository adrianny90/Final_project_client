import { useState } from "react";
import { Link } from "react-router-dom";
import ItemGrid from "../components/ItemGrid.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";

const GetFreePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState("Offer");

  return (
    <div>
      <div className="flex flex-col items-center">
        <Link
          to="/map"
          className="px-5 py-3 m-5 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Map
        </Link>
      </div>

      {/* Layout for sidebar and content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar column */}
        <div className="md:w-1/4">
          {/* Post Type Dropdown */}
          <div className="px-4">
            <h2 className="font-semibold text-lg text-black mb-2">Post type</h2>
            <select
              value={selectedPostType}
              onChange={(e) => setSelectedPostType(e.target.value)}
              className="w-61 px-4 py-1 rounded-md bg-green-500 text-black text-sm"
            >
              <option value="Offer">Offer</option>
              <option value="Request">Request</option>
            </select>
          </div>

          {/* Category Sidebar */}
          <CategorySidebar
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>

        {/* Content area */}
        <div>
          <ItemGrid
            selectedCategories={selectedCategories}
            selectedPostType={selectedPostType}
          />
        </div>
      </div>
    </div>
  );
};

export default GetFreePage;
