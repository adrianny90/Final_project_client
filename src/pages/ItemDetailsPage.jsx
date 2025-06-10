import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Clock, Gift, FilePen } from "lucide-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";
import Map from "../components/Map.jsx";
import { toast } from "react-toastify";

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
  const [currentImage, setCurrentImage] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const { id } = useParams();
  const { user } = useAuth();
  console.log("User:", user);
  const senderId = user?._id;
  console.log("Sender Id:", senderId);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/items/${id}`
        );
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
        content: message,
        receiverId: item.userId,
        senderId: senderId,
        itemId: item._id,
        ownerId: item.userId,
      };
      console.log("Sending message:", dataToSend);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/message`,
        dataToSend
      );

      toast.success("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Error sending message.");
    } finally {
      setSending(false);
    }
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? item.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === item.photos.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  const PostTypeIcon = item.postType === "Offer" ? Gift : FilePen;

  return (
    <div className="max-w-3xl mx-auto p-2  bg-gray-200 rounded-xl overflow-hidden">
      <div className="relative w-full h-56 sm:h-72 bg-gray-300 rounded-lg">
        <img
          src={item?.photos?.[currentImage] || "/image/item.jpg"}
          className="w-full h-full object-contain"
        />
        {item.photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-black/80"
              aria-label="Previous image"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-black/80"
              aria-label="Next image"
            >
              ❯
            </button>
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded px-2 py-0.5">
              {currentImage + 1}/{item.photos.length}
            </div>
          </>
        )}
      </div>

      <h1 className="text-black text-xl font-bold mt-4 px-4">{item.title}</h1>

      <div className="flex flex-wrap items-center text-md text-gray-700 gap-2 mt-2 px-4 gap-x-2 gap-y-1">
        <MapPin className="w-5 h-5" />
        <span>
          {item.address?.street || ""} {item.address?.houseStreet || ""},{" "}
          {item.address?.postalCode || ""} {item.address?.city || ""}
        </span>
      </div>

      <div className="flex flex-wrap items-center text-md text-gray-700 gap-2 mt-2 px-4 gap-x-2 gap-y-1">
        <Calendar className="w-5 h-5" />
        <span>Posted on: {formatDate(item.createdAt)}</span>
      </div>

      <div className="flex flex-wrap items-center text-md text-gray-700 gap-2 mt-2 px-4 gap-x-2 gap-y-1">
        <PostTypeIcon className="w-5 h-5" />
        <span>Post type: {item.postType}</span>
      </div>

      <div className="flex flex-wrap items-center text-md text-gray-700 gap-2 mt-2 px-4 gap-x-2 gap-y-1">
        <Clock className="w-5 h-5" />
        <span>Collection Time: {item.collectionTime}</span>
      </div>

      <div className="text-black mt-4 px-4">
        <span className="block font-bold text-lg mb-1">Description</span>
        <p className="font-normal text-md">{item.description}</p>
      </div>

      <div className="text-black mt-4 px-4">
        <span className="block font-bold text-lg mb-1">Write message</span>
        <textarea
          name="message"
          placeholder="Write message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
          required
          rows={4}
          className="w-full p-2 border border-black rounded placeholder-gray-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="block mt-4 mx-auto w-40 bg-gray-600 font-bold text-white p-2 rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Send message
        </button>
      </div>
      <div className="map mt-4">
        <Map
          center={
            item?.address?.location?.coordinates && [
              item.address.location.coordinates[1], // latitude
              item.address.location.coordinates[0], // longitude
            ]
          }
          items={[item]} //transform item to array
          selectedItem={item} // select item for marker
        />
      </div>

      <Link
        to="/get"
        className="inline-block mt-2 text-blue-600 hover:underline px-4"
      >
        ← Back
      </Link>
    </div>
  );
};

export default ItemDetails;
