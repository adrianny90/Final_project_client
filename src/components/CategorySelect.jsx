const CategorySelect = ({ value, onChange }) => (
  <div className="mb-6">
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
      <option value="">All Categories</option>
      <option value="Books">Books</option>
      <option value="Baby and Toys">Baby and Toys</option>
      <option value="Beauty and Personal Care">Beauty and Personal Care</option>
      <option value="Clothing and Accessories">Clothing and Accessories</option>
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
      <option value="Garden Accessories and Plants">
        Garden Accessories and Plants
      </option>
      <option value="Household Appliances and Goods">
        Household Appliances and Goods
      </option>
      <option value="Kitchen Appliances and Accessories">
        Kitchen Appliances and Accessories
      </option>
      <option value="Hobby">Hobby</option>
      <option value="Sports and Outdoors">Sports and Outdoors</option>
      <option value="Pet Supplies">Pet Supplies</option>
      <option value="Services">Services</option>
      <option value="Others">Others</option>
    </select>
  </div>
);

export default CategorySelect;
