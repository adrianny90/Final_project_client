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
    <div className="bg-white rounded-xl overflow-hidden text-black">
      <img src={item.photos} alt={item.title} className="h-60 w-full" />
      <div className="p-2">
        <h2 className="font-bold">{item.title}</h2>

        <div className="flex items-center text-sm text-gray-700 gap-1">
          <MapPin className="w-4 h-4 text-gray-700" />
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
