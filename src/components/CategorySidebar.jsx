import CategorySelect from "./CategorySelect";

const CategorySidebar = ({ selectedCategories, onCategoryChange }) => {
  const categories = [
    "Accessories",
    "Baby & Toys",
    "Bathroom Essentials",
    "Bedding & Linens",
    "Books",
    "Clothing",
    "Decorations",
    "Electronics",
    "Furniture",
    "Kitchen & Dining",
    "Gardening Supplies",
    "Hobby & Sports",
    "Pets",
    "Services",
    "Miscellaneous",
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-2xl text-black m-4 p-4 w-60">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>
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
