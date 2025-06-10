const CategorySidebar = ({ selectedCategories, onCategoryChange }) => {
  const categories = [
    "Books",
    "Baby and Toys",
    "Beauty and Personal Care",
    "Clothing and Accessories",
    "Electronics",
    "Furniture",
    "Garden Accessories and Plants",
    "Household Appliances and Goods",
    "Kitchen Appliances and Accessories",
    "Hobby",
    "Sports and Outdoors",
    "Pet Supplies",
    "Services",
    "Others",
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-2xl text-black m-4 w-61">
      <h2 className="flex justify-center font-semibold text-md mb-4">
        Categories
      </h2>
      <div className="flex flex-col space-y-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => toggleCategory(cat)}
            className={`text-sm px-3 py-1 rounded-full text-left transition-colors
              ${
                selectedCategories.includes(cat)
                  ? "bg-green-500 text-black"
                  : "bg-gray-200 text-black hover:bg-green-500"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
