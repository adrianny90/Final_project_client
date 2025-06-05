import categories from "../utils/categories.js";

const CategorySelect = ({ value, onChange, className = "" }) => (
  <div className={`mb-6 ${className}`}>
    <label htmlFor="category" className="block text-black">
      Category
    </label>
    <select
      id="category"
      name="category"
      value={value || ""}
      onChange={onChange}
      required
      className="w-full border border-black rounded-md p-2 text-gray-700"
    >
      {categories.map((category) => (
        <option
          key={category}
          value={category === "All Categories" ? "" : category}
        >
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelect;
