import { useAuth } from "../hooks/useAuth.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../utils/auth.js";
import MyItemInPanel from "../components/MyItemInPanel.jsx";

const Panel = () => {
  const { setUser, user } = useAuth();
  const [showData, setShowData] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [messages, setMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({}); // Store user data for item owners
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item for conversation
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetailItemId, setSelectedDetailItemId] = useState(null); // Track item for details

  const handlePersonalData = () => {
    setShowData((prev) => !prev);
    setShowMessage(false);
    setShowItems(false);
  };

  const handleMessages = () => {
    setShowMessage((prev) => !prev);
    setShowItems(false);
    setShowData(false);
  };

  const handleItems = () => {
    setShowItems((prev) => !prev);
    setShowData(false);
    setShowMessage(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user.firstName || !user.lastName || !user.email) {
        throw new Error("At least name and email are required");
      }
      const data = await updateUser(user);
      toast.success("Submitted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const fetchMessagesAndItems = async () => {
        setLoading(true);
        try {
          const res = await fetch("http://localhost:3000/message/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch messages");
          }
          const messagesData = await res.json();

          const itemIds = [...new Set(messagesData.map((msg) => msg.itemId))];
          console.log("messages Users", itemIds);

          setMessages(messagesData);
          const itemsRes = await fetch("http://localhost:3000/items/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(itemIds),
          });
          if (!itemsRes.ok) {
            throw new Error("Failed to fetch items");
          }
          const itemsData = await itemsRes.json();
          console.log("itemsData:", itemsData);

          setItems(itemsData || []);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMessagesAndItems();
    }
  }, [showMessage]);

  useEffect(() => {
    if (showItems) {
      const fetchItems = async () => {
        setLoading(true);
        console.log(user);

        try {
          const res = await fetch("http://localhost:3000/items/userAll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch items");
          }
          const data = await res.json();
          console.log(data);

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

  const getConversationMessages = (itemId) => {
    return messages
      .filter((msg) => msg.itemId === itemId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 p-4 flex flex-col gap-2">
        <button
          onClick={handlePersonalData}
          className={`px-4 py-2 text-white font-semibold rounded-lg hover:text-gray-900 transition-colors duration-300 ${
            showData
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          Personal Data
        </button>
        <button
          onClick={handleMessages}
          className={`px-4 py-2 text-white font-semibold rounded-lg hover:text-gray-900 transition-colors duration-300 ${
            showMessage
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          Messages
        </button>
        <button
          onClick={handleItems}
          className={`px-4 py-2 text-white font-semibold rounded-lg hover:text-gray-900 transition-colors duration-300 ${
            showItems
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          My Items
        </button>
      </div>

      <div className="flex-1 p-8">
        {showData ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl text-white font-semibold mb-6">
              Personal Information
            </h2>
            <label className="block mb-4">
              <span className="text-gray-300">First name:</span>
              <input
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Last name:</span>
              <input
                name="lastName"
                value={user.lastName || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Email:</span>
              <input
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Street:</span>
              <input
                name="address.street"
                value={user.address?.street || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">House number:</span>
              <input
                name="address.houseStreet"
                value={user.address?.houseStreet || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter house number"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Postal code:</span>
              <input
                name="address.postalCode"
                value={user.address?.postalCode || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter postal code"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">City:</span>
              <input
                name="address.city"
                value={user.address?.city || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Created:</span>
              <input
                name="created"
                value={user.createdAt?.split("T")[0] || ""}
                disabled
                className="mt-1 w-full p-2 bg-gray-600 text-white border border-gray-600 rounded-lg cursor-not-allowed"
                placeholder="Creation date"
              />
            </label>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              Submit Changes
            </button>
          </form>
        ) : showMessage ? (
          <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex">
            <div className="w-1/3 pr-4 border-r border-gray-600">
              <h2 className="text-2xl text-white font-semibold mb-6">
                Items with Messages
              </h2>
              {loading ? (
                <p className="text-gray-300">Loading items...</p>
              ) : items.length === 0 ? (
                <p className="text-gray-300">No items with messages found.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => setSelectedItemId(item._id)}
                      className={`p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer transition-colors duration-200 flex flex-col items-center ${
                        selectedItemId === item._id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <img
                        src={item.photos?.[0]}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">
                        Owner: {users[item.userId]?.firstName || "anonymous"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-2/3 pl-4">
              <h2 className="text-2xl text-white font-semibold mb-6">
                Conversation
              </h2>
              {selectedItemId ? (
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-700 rounded-lg">
                    {getConversationMessages(selectedItemId).length === 0 ? (
                      <p className="text-gray-300">
                        No messages for this item.
                      </p>
                    ) : (
                      getConversationMessages(selectedItemId).map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.senderId === user._id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              {message.senderId !== user._id && (
                                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-2">
                                  {users[
                                    items.find(
                                      (item) => item._id === message.itemId
                                    )?.userId
                                  ]?.firstName?.[0] || "?"}
                                </div>
                              )}
                              <p className="font-semibold">
                                {message.senderId === user._id
                                  ? "You"
                                  : users[
                                      items.find(
                                        (item) => item._id === message.itemId
                                      )?.userId
                                    ]?.firstName || "Unknown"}
                              </p>
                            </div>
                            <p>{message.content}</p>
                            <p className="text-xs text-gray-300 mt-1">
                              {new Date(message.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <p className="text-gray-300">
                  Select an item to view the conversation.
                </p>
              )}
            </div>
          </div>
        ) : showItems ? (
          <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white font-semibold mb-6">My Items</h2>
            {loading ? (
              <p className="text-gray-300">Loading items...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-300">No items found.</p>
            ) : (
              <>
                <div className="flex flex-col items-center gap-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="w-full md:w-140 p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
                    >
                      <img
                        src={
                          item.photos?.[0] ||
                          "https://th.bing.com/th/id/OIP.e792CYPCRH59y_rdvSpfPAHaF8?rs=1&pid=ImgDetMain"
                        }
                        alt="Images are not available"
                        className="w-full h-40 object-cover rounded-lg mb-4 text-white text-2xl"
                      />
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">{item.description}</p>
                      <p className="text-gray-400 text-sm">
                        Category: {item.category}
                      </p>
                      {item.collectionTime && (
                        <p className="text-gray-400 text-sm">
                          Collection Time: {item.collectionTime}
                        </p>
                      )}
                      {item.address && (
                        <p className="text-gray-400 text-sm">
                          Address: {item.address.street || ""}{" "}
                          {item.address.houseStreet || ""},{" "}
                          {item.address.city || ""}{" "}
                          {item.address.postalCode || ""}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm">
                        Created: {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedDetailItemId(item._id);
                          setShowDetails(true);
                        }}
                        className="mt-2 px-3 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
                {selectedDetailItemId && (
                  <MyItemInPanel
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                    item={items.find(
                      (item) => item._id === selectedDetailItemId
                    )}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-white text-center">
            Select an option from the sidebar
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;
