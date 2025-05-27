const CategorySelect = ({ value, onChange }) => (
  <div className="category-div">
    <label className="category-label" htmlFor="title"></label>
    <select
      id="category"
      name="category"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">All Categories</option>
      <option value="Accessories">Accessories</option>
      <option value="Baby and Toys">Baby and Toys</option>
      <option value="Bathroom Essentials">Bathroom Essentials</option>
      <option value="Bedding and Linens">Bedding and Linens</option>
      <option value="Books">Books</option>
      <option value="Clothing">Clothing</option>
      <option value="Decorations">Decorations</option>
      <option value="Electronics">Electronics</option>
      <option value="Fitness and Sports">Fitness and Sports</option>
      <option value="Furniture">Furniture</option>
      <option value="Kitchen and Dining">Kitchen and Dining</option>
      <option value="Gardening Supplies">Gardening Supplies</option>
      <option value="Hobby">Hobby</option>
      <option value="Pets">Pets</option>
      <option value="Services">Services</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>
  </div>
);
export default CategorySelect;
