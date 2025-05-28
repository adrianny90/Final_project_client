import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-200 rounded-xl shadow">
      <img
        src={
          Array.isArray(item.photos)
            ? item.photos[0]
            : item.photos || "/fallback.jpg"
        }
        alt={item.title}
        className="w-full h-72 object-cover rounded-md"
      />

      <h1 className="text-black text-2xl font-bold mt-4">{item.title}</h1>

      <div className="flex items-center text-gray-700 gap-2 mt-2">
        <MapPin className="w-5 h-5 text-gray-700" />
        <span>
          {item.address?.street || ""} {item.address?.houseStreet || ""},{" "}
          {item.address?.postalCode || ""} {item.address?.city || ""}
        </span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1">
        <Calendar className="w-5 h-5 text-gray-700" />
        <span>Posted on: {formatDate(item.createdAt)}</span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1">
        <Clock className="w-5 h-5 text-gray-700" />
        <span>Collection Time: {formatDateTime(item.collectionTime)}</span>
      </div>

      <div className="text-black font-bold mt-4">
        <span className="block text-lg mb-1">Description</span>
        <p className="font-normal">{item.description}</p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            // Navigate to a chat page or open a modal
            alert("Send message functionality to be implemented");
          }}
          className="mt-4 w-40 bg-gray-600 font-bold text-white p-2 rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Send Message
        </button>
      </div>

      <Link
        to="/get"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
};

export default ItemDetails;
