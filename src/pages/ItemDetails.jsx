import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
      <img
        src={item.photos}
        alt={item.title}
        className="w-full h-72 object-cover rounded-md"
      />

      <h1 className="text-2xl font-bold mt-4">{item.title}</h1>

      <div className="flex items-center text-gray-700 gap-2 mt-2">
        <MapPin className="w-5 h-5 text-gray-700" />
        <span>
          {item.address?.city}, {item.address?.street}
        </span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1">
        <Calendar className="w-5 h-5 text-gray-700" />
        <span>Posted on: {formatDate(item.createdAt)}</span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1">
        <Clock className="w-5 h-5 text-gray-700" />
        <span>Collection Time: {item.collectionTime}</span>
      </div>

      <p className="mt-4 text-gray-800">{item.description}</p>

      <Link
        to="http://localhost:5173/get"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
};

export default ItemDetails;
