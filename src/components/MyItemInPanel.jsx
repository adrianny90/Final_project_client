import { MapPin, Calendar, Clock } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("de-DE", {
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[50%] max-h-[80vh] mx-auto p-4 sm:p-6 bg-white rounded-xl overflow-y-auto z-20 shadow-lg">
        <div className="w-full h-56 sm:h-72 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={
              Array.isArray(item.photos)
                ? item.photos[0]
                : item.photos ||
                  "https://th.bing.com/th/id/OIP.e792CYPCRH59y_rdvSpfPAHaF8?rs=1&pid=ImgDetMain"
            }
            alt={item.title || "Item image"}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4 space-y-3 px-2 sm:px-4">
          <h1 className="text-gray-900 text-center font-bold text-lg sm:text-xl md:text-2xl">
            {item.title}
          </h1>

          <div className="text-xs sm:text-sm space-y-1">
            <p className="text-center">
              <span className="text-gray-600">Category: </span>
              <span className="text-gray-900">{item.category || "N/A"}</span>
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <p>
                <span className="text-gray-600">Posted on: </span>
                <span className="text-gray-900">
                  {formatDate(item.createdAt)}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <p>
                <span className="text-gray-600">Collection Time: </span>
                <span className="text-gray-900">
                  {item.collectionTime || "N/A"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <p>
                <span className="text-gray-600">Address: </span>
                <span className="text-gray-900">
                  {item.address?.street || ""} {item.address?.houseStreet || ""}
                  {item.address?.city ? ", " : ""}
                  {item.address?.city || ""} {item.address?.postalCode || ""}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 text-center font-semibold text-lg sm:text-xl mb-1">
              Description
            </h2>
            <p className="text-gray-900 text-center text-base sm:text-lg">
              {item.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="flex justify-center w-full mt-4 sm:mt-6">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            aria-label={`Close details for ${item.title}`}
            className="px-4 sm:px-6 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Close Details
          </button>
        </div>
      </div>
    </>
  );
};

export default MyItemInPanel;
