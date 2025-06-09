import { useAuth } from "../hooks/useAuth.js";
import { useState, useEffect } from "react";
import MyItemInPanel from "../components/MyItemInPanel.jsx";
import { toast } from "react-toastify";

const ItemsPanel = ({ showItems }) => {
  const { setUser, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetailItemId, setSelectedDetailItemId] = useState(null);
  const [selectedDeleteItemId, setSelectedDeleteItemId] = useState(null);

  useEffect(() => {
    if (showItems) {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/items/userAll`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
              credentials: "include",
            }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch items");
          }
          const data = await res.json();
          console.log("data", data);

          setItems(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }
  }, [showItems]);

  //delete item in item section
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/items/${itemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setItems((prevItems) => {
          const newItems = prevItems.filter((item) => item._id !== itemId);
          //   console.log("Updated items:", newItems);
          return newItems;
        });
        toast.info("Item deleted successfully! 👋", {
          ariaLabel: "Delete confirmation",
        });

        if (selectedItemId?._id === itemId) {
          setSelectedItemId(null);
          // setSelectedRecipientId(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error(error.response?.data?.message || "Error deleting item.");
    }
  };
  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
        <dialog id="my_modal_2" className="modal">
          <form
            method="dialog"
            className="modal-box bg-gray-200 flex items-center justify-center"
          >
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 w-96">
              <h3 className="font-bold text-lg text-center text-red-800">
                WARNING
              </h3>
              <p className="py-4 text-center text-gray-700">
                Do you really want to delete this item?
              </p>
              <div className="modal-action mt-4 flex justify-center gap-6">
                <button
                  onClick={() => handleDelete(selectedDeleteItemId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Yes, DELETE
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  onClick={() => {
                    setSelectedDeleteItemId(null);
                    document.getElementById("my_modal_2").close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </dialog>

        <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
          My Items
        </h2>
        {loading ? (
          <p className="text-gray-300 text-sm sm:text-base">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-300 text-sm sm:text-base">No items found.</p>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="w-full p-4 sm:p-6 bg-gray-700 rounded-xl shadow-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="w-full h-32 sm:h-40 bg-gray-500 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        item.photos?.[0] ||
                        "https://th.bing.com/th/id/OIP.e792CYPCRH59y_rdvSpfPAHaF8?rs=1&pid=ImgDetMain"
                      }
                      alt={item.title || "Item image"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-white text-center font-semibold text-xl sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-white text-center text-sm sm:text-base">
                      {item.description}
                    </p>
                    <div className="text-xs sm:text-sm space-y-1">
                      {item.collectionTime && (
                        <p>
                          <span className="text-gray-400">
                            Collection Time:{" "}
                          </span>
                          <span className="text-white">
                            {item.collectionTime}
                          </span>
                        </p>
                      )}
                      {item.address && (
                        <p>
                          <span className="text-gray-400">Address: </span>
                          <span className="text-white">
                            {item.address.street || ""}
                            {item.address.houseStreet || ""}
                            {item.address.city || ""}
                            {item.address.postalCode || ""}
                          </span>
                        </p>
                      )}
                      <p>
                        <span className="text-gray-400">Created: </span>
                        <span className="text-white">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">Category: </span>
                        <span className="text-white">
                          {item.category || "not specified"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <button
                      onClick={() => {
                        setSelectedDetailItemId(item._id);
                        setShowDetails(true);
                      }}
                      className="px-4 sm:px-6 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring- desire-2 focus:ring-green-400"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setSelectedDeleteItemId(item._id);
                        document.getElementById("my_modal_2").showModal();
                      }}
                      className="px-4 sm:px-6 py-2 bg-red-400 text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedDetailItemId && items?.length && (
              <MyItemInPanel
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                item={items.find((item) => item._id === selectedDetailItemId)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ItemsPanel;
