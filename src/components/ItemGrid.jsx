import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";

const ItemGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items");
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch items: ${error.message}`);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
