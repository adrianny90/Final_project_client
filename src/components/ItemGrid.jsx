import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import Spinner from "./Spinner";

const ItemGrid = ({ selectedCategories, selectedPostType = "Offer" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const params = new URLSearchParams();

        // Always include postType (default Offer)
        params.append("postType", selectedPostType);

        // Include selected categories if any
        if (selectedCategories.length > 0) {
          params.append("category", selectedCategories.join(","));
        }

        const url = `${baseUrl}/items?${params.toString()}`;
        const response = await axios.get(url);
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategories, selectedPostType]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (items.length === 0)
    return (
      <div className="text-gray-900 text-center">
        No items found for the selected filters.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {items.map((item, idx) => (
        <ItemCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
