import { MapPin, Calendar, Clock } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const MyItemInPanel = ({ showDetails, setShowDetails, item }) => {
  if (!showDetails) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-10" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 max-h-[90vh] mx-auto p-6 sm:p-8 bg-gray-200 rounded-xl overflow-y-auto z-20">
        <img
          src={
            Array.isArray(item.photos)
              ? item.photos[0]
              : item.photos ||
                "https://th.bing.com/th/id/OIP.e792CYPCRH59y_rdvSpfPAHaF8?rs=1&pid=ImgDetMain"
          }
          alt="Images are not available"
          className="w-full h-80 sm:h-96 object-cover rounded-lg text-black text-4xl"
        />

        <h1 className="text-black text-xl sm:text-2xl md:text-3xl font-bold mt-6 px-4">
          {item.title}
        </h1>

        <div className="flex items-center text-gray-700 gap-2 mt-2 px-4"></div>

        <div className="flex items-center text-gray-700 gap-2 mt-1 px-4">
          <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
          <span className="text-base sm:text-lg">
            Posted on: {formatDate(item.createdAt)}
          </span>
        </div>

        <div className="flex items-center text-gray-700 gap-2 mt-1 px-4">
          <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
          <span className="text-base sm:text-lg">
            Collection Time: {item.collectionTime}
          </span>
        </div>

        <div className="text-black mt-6 px-4">
          <span className="block font-bold text-xl sm:text-2xl mb-1">
            Description
          </span>
          <p className="font-normal text-lg sm:text-xl">{item.description}</p>
        </div>

        <div className="flex items-center text-gray-700 gap-2 mt-4 px-4">
          <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
          <span className="text-base sm:text-lg">
            Address: {item.address?.street || ""}{" "}
            {item.address?.houseStreet || ""}
            {item.address?.city ? ", " : ""}
            {item.address?.city || ""} {item.address?.postalCode || ""}
          </span>
        </div>

        <div className="flex items-center text-gray-700 gap-2 mt-1 px-4">
          <span className="text-base sm:text-lg">
            Category: {item.category || "N/A"}
          </span>
        </div>

        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-base sm:text-lg"
        >
          Close details view
        </button>
      </div>
    </>
  );
};

export default MyItemInPanel;
