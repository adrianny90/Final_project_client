
const CategorySelect = ({value, onChange}) => (
    <div className="category-div">
                <label className="category-label" htmlFor="title"></label>
                <select 
                id="category"
                name="category"
                value={value}
                onChange={onChange}
                required
                 >
                    <option value="">All Cagegories</option>
                    <option value="furnitureHousehold">Furniture/Household</option>
                    <option value="electronics">Electronics</option>
                    <option value="books">Books</option>
                    <option value="services">Services</option>
                    <option value="tickets">Tickets</option>
                    <option value="hobby">Hobby</option>
                    <option value="forKids">For Kids</option>
                    <option value="clothes">Clothes</option>
                    <option value="materials">Materials</option>
                    <option value="else">Else</option>
                 </select>
            </div>
);
export default CategorySelect;