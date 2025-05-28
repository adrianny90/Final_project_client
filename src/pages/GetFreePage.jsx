import { useState } from "react";
import ItemGrid from "../components/ItemGrid.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";

const GetFreePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="text-white">
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
