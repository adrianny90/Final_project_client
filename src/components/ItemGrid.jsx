import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";

const ItemGrid = ({ selectedCategories }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const query = selectedCategories.length
          ? `?category=${selectedCategories.join(",")}`
          : "";
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/items${query}`
        );
        setItems(response.data);
        // console.log("all items", response.data);

        //setLoading(false);
      } catch (error) {
        setError(`Failed to fetch items: ${error.message}`);
        //setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategories]);

  const filteredItems =
    selectedCategories.length > 0
      ? items.filter((item) => selectedCategories.includes(item.category))
      : items;

  if (loading) {
    return <div className="loading-message">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredItems.map((item, idx) => (
        <ItemCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
