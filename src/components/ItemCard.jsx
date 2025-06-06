import { Link } from "react-router-dom";
import { MapPin, Calendar, Gift, FilePen } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ItemCard = ({ item }) => {
  const PostTypeIcon = item.postType === "Offer" ? Gift : FilePen;

  return (
    <div className="bg-gray-200 rounded-xl overflow-hidden text-black shadow hover:shadow-md transition duration-300">
      <img
        src={item.photos?.[0] ?? "/image/no-image.avif"}
        alt={item.title}
        className="w-full object-cover h-48 sm:h-56 md:h-60"
      />
      <div className="p-2">
        <Link to={`/get/items/${item._id}`}>
          <h2 className="font-bold text-base sm:text-lg leading-tight truncate">
            {item.title.length > 30
              ? item.title.slice(0, 30) + "..."
              : item.title}
          </h2>
        </Link>

        <div className="flex flex-wrap items-center text-sm text-gray-700 gap-x-2 gap-y-1">
          <MapPin className="w-4 h-4" />
          <span>{item.address.postalCode}</span>
          <span>{item.address.city}</span>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-700 gap-x-2 gap-y-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(item.createdAt)}</span>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-700 gap-x-2 gap-y-1">
          <PostTypeIcon className="w-4 h-4" />
          <span>{item.postType}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
