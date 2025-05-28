import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ItemCard = ({ item }) => {
  return (
    <div className="bg-gray-200 rounded-xl overflow-hidden text-black">
      <img
        src={Array.isArray(item.photos) ? item.photos[0] : "/image/item.jpg"}
        alt={item.title}
        className="h-60 w-full"
      />
      <div className="p-2">
        <Link to={`items/${item._id}`}>
          <h2 className="font-bold">
            {item.title.length > 30
              ? item.title.slice(0, 30) + "..."
              : item.title}
          </h2>
        </Link>

        <div className="flex items-center text-sm text-gray-700 gap-1">
          <MapPin className="w-4 h-4 text-gray-700" />
          <span>{item.address.postalCode}</span>
          <span>{item.address.city}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 gap-1">
          <Calendar className="w-4 h-4 text-gray-700" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
