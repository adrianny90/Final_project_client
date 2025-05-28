import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";

// Formatters
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
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const { id } = useParams();
  const { user } = useAuth();
  const senderId = user?.userId;

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

  const handleSendMessage = async () => {
    if (!message.trim() || !item?._id || !item?.userId) return;

    try {
      setSending(true);
      const dataToSend = {
        senderId: senderId,
        receiverId: item.userId,
        content: message,
        itemId: item._id,
      };

      const response = await axios.post(
        "http://localhost:3000/messages",
        dataToSend
      );

      alert("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Error sending message.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-2 bg-gray-200 rounded-xl overflow-hidden">
      <img
        src={
          Array.isArray(item.photos)
            ? item.photos[0]
            : item.photos || "/image/item.jpg"
        }
        alt={item.title}
        className="w-full"
      />

      <h1 className="text-black text-2xl font-bold mt-4 px-4">{item.title}</h1>

      <div className="flex items-center text-gray-700 gap-2 mt-2  px-4">
        <MapPin className="w-5 h-5 text-gray-700" />
        <span>
          {item.address?.street || ""} {item.address?.houseStreet || ""},{" "}
          {item.address?.postalCode || ""} {item.address?.city || ""}
        </span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1  px-4">
        <Calendar className="w-5 h-5 text-gray-700" />
        <span>Posted on: {formatDate(item.createdAt)}</span>
      </div>

      <div className="flex items-center text-gray-700 gap-2 mt-1  px-4">
        <Clock className="w-5 h-5 text-gray-700" />
        <span>Collection Time: {formatDateTime(item.collectionTime)}</span>
      </div>

      <div className="text-black mt-4 px-4">
        <span className="block font-bold text-lg mb-1">Description</span>
        <p className="font-normal">{item.description}</p>
      </div>

      <div className="text-black mt-4 px-4">
        <span className="block font-bold text-lg mb-1">Write message</span>
        <textarea
          name="message"
          placeholder="Write here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
          required
          rows={4}
          className="w-full p-2 border border-black rounded placeholder-gray-400"
        />
        <button
          onClick={handleSendMessage}
          className="block mt-4 mx-auto w-40 bg-gray-600 font-bold text-white p-2 rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Send message
        </button>
      </div>

      <Link
        to="/get"
        className="inline-block mt-2 text-black hover:underline px-4"
      >
        ← Back
      </Link>
    </div>
  );
};

export default ItemDetails;
