import { useAuth } from "../hooks/useAuth.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../utils/auth.js";
import MyItemInPanel from "../components/MyItemInPanel.jsx";
import axios from "axios";

const Panel = () => {
  const { setUser, user } = useAuth();
  const [showData, setShowData] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [messages, setMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetailItemId, setSelectedDetailItemId] = useState(null);
  const [chat, setChat] = useState("");
  const [sending, setSending] = useState(false);
  const [owner, setOwner] = useState();

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
          // fetch all items that user is either receiver of message or sender
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/message/user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
              credentials: "include",
            }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch messages");
          }
          const messagesData = await res.json(); // all  messages data

          const itemIds = [...new Set(messagesData.map((msg) => msg.itemId))];
          console.log("messages Users", messagesData);

          setMessages(messagesData);

          /// fetching all items that have any message
          const itemsRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/items/user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(itemIds),
            }
          );
          if (!itemsRes.ok) {
            throw new Error("Failed to fetch items");
          }
          const itemsData = await itemsRes.json();
          console.log("itemsData:", itemsData);
          setItems(itemsData || []);

          ///fetch all owners of the items

          const ownersRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/items`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(itemsData),
            }
          );
          if (!ownersRes.ok) {
            throw new Error("Failed to fetch items");
          }
          const ownersDetails = await ownersRes.json();
          setOwner(ownersDetails);
          console.log("owners", ownersDetails);
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
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateA - dateB;
      });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chat.trim() || !selectedItemId?._id || !selectedItemId?.userId) {
      console.log("Validation failed:", {
        chat: chat.trim(),
        selectedItemId,
      });
      return;
    }

    try {
      setSending(true);
      let dataToSend = {};

      if (selectedItemId.userId === user._id) {
        const itemMessages = messages.filter(
          (msg) => msg.itemId === selectedItemId._id
        );

        const lastMessage =
          itemMessages.length > 0
            ? itemMessages[itemMessages.length - 1]
            : null;

        if (!lastMessage) {
          toast.error("No previous messages found for this item.");
          setSending(false);
          return;
        }

        dataToSend = {
          content: chat,
          receiverId: lastMessage.senderId,
          senderId: user._id,
          itemId: selectedItemId._id,
          ownerId: user._id,
        };
        console.log("dataSent (owner)", dataToSend);
      } else {
        dataToSend = {
          content: chat,
          receiverId: selectedItemId.userId,
          senderId: user._id,
          itemId: selectedItemId._id,
          ownerId: selectedItemId.userId,
        };
        console.log("dataSent (non-owner)", dataToSend);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/message`,
        dataToSend,
        { withCredentials: true }
      );

      setMessages((prev) => {
        const updatedMessages = [...prev, response.data];

        return updatedMessages.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateA - dateB;
        });
      });

      toast.success("Message sent successfully!");
      setChat("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.message || "Error sending message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 md:flex-row">
      <div className="flex flex-col gap-2 p-4 bg-gray-800 w-full md:w-64 md:min-h-screen">
        <button
          onClick={handlePersonalData}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 ${
            showData
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          Personal Data
        </button>
        <button
          onClick={handleMessages}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 ${
            showMessage
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          Messages
        </button>
        <button
          onClick={handleItems}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 ${
            showItems
              ? "bg-gray-400 hover:bg-green-500"
              : "bg-gray-600 hover:bg-green-800"
          }`}
        >
          My Items
        </button>
      </div>
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!              Personal details    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <div className="flex-1 p-4 md:p-8">
        {showData ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
              Personal Information
            </h2>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">
                First name:
              </span>
              <input
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter first name"
              />
            </label>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">
                Last name:
              </span>
              <input
                name="lastName"
                value={user.lastName || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter last name"
              />
            </label>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">Email:</span>
              <input
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter email"
              />
            </label>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">
                Street:
              </span>
              <input
                name="address.street"
                value={user.address?.street || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter street"
              />
            </label>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">
                House number:
              </span>
              <input
                name="address.houseStreet"
                value={user.address?.houseStreet || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter house number"
              />
            </label>
            <label className="block mb-3 sm:mb-4">
              <span className="text-gray-300 text-sm sm:text-base">
                Postal code:
              </span>
              <input
                name="address.postalCode"
                value={user.address?.postalCode || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter postal code"
              />
            </label>
            <label className="block mb-3 sm:mb-6">
              <span className="text-gray-300 text-sm sm:text-base">City:</span>
              <input
                name="address.city"
                value={user.address?.city || ""}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter city"
              />
            </label>
            <label className="block mb-4 sm:mb-6">
              <span className="text-gray-300 text-sm sm:text-base">
                Created:
              </span>
              <input
                name="created"
                value={user.createdAt?.split("T")[0] || ""}
                disabled
                className="mt-1 w-full p-2 bg-gray-600 text-white border border-gray-600 rounded-lg cursor-not-allowed text-sm sm:text-base"
                placeholder="Creation date"
              />
            </label>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm sm:text-base"
            >
              Submit Changes
            </button>
            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!              Messages    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          </form>
        ) : showMessage ? (
          <div className="w-full max-w-4xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 md:pr-4 md:border-r md:border-gray-600 mb-4 md:mb-0">
              <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
                Items with Messages
              </h2>
              {loading ? (
                <p className="text-gray-300 text-sm sm:text-base">
                  Loading items...
                </p>
              ) : items.length === 0 ? (
                <p className="text-gray-300 text-sm sm:text-base">
                  No items with messages found.
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => setSelectedItemId(item)}
                      className={`p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer transition-colors duration-200 flex flex-col items-center ${
                        selectedItemId === item._id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <div className="w-full h-24 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={item.photos?.[0] || "/image/item.jpg"}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-white font-semibold text-sm sm:text-base mt-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Ad owner:{" "}
                        {owner.find((o) => o._id === item.userId)?.firstName ||
                          "anonymous"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-2/3 md:pl-4">
              <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
                Conversation
              </h2>
              {selectedItemId ? (
                <div className="flex flex-col h-[400px] sm:h-[500px]">
                  <div
                    className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-700 rounded-lg"
                    ref={(el) => {
                      if (el) {
                        el.scrollTop = el.scrollHeight;
                      }
                    }}
                  >
                    {getConversationMessages(selectedItemId._id).length ===
                    0 ? (
                      <p className="text-gray-300 text-sm sm:text-base">
                        No messages for this item.
                      </p>
                    ) : (
                      getConversationMessages(selectedItemId._id).map(
                        (message) => (
                          <div
                            key={message._id}
                            className={`flex ${
                              message.senderId === user._id
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] sm:max-w-xs p-3 rounded-lg ${
                                message.senderId === user._id
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-600 text-white"
                              }`}
                            >
                              <div className="flex items-center mb-1">
                                {message.senderId !== user._id && (
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-2 text-xs sm:text-sm">
                                    {owner.find((o) =>
                                      selectedItemId.userId === user._id
                                        ? o._id === message.senderId
                                        : o._id === selectedItemId.userId
                                    )?.firstName?.[0] || ""}
                                  </div>
                                )}
                                <p className="font-semibold text-xs sm:text-sm">
                                  {message.senderId === user._id
                                    ? user.firstName
                                    : owner.find((o) =>
                                        selectedItemId.userId === user._id
                                          ? o._id === message.senderId
                                          : o._id === selectedItemId.userId
                                      )?.firstName || "Recipient"}
                                </p>
                              </div>
                              <p className="text-xs sm:text-sm">
                                {message.content}
                              </p>
                              <p className="text-xs text-gray-300 mt-1">
                                {new Date(message.createdAt).toLocaleString(
                                  "pl-PL",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                  <form
                    onSubmit={handleSendMessage}
                    className="mt-4 flex gap-2"
                  >
                    <input
                      type="text"
                      name="chat"
                      placeholder="Type a message..."
                      value={chat}
                      onChange={(e) => setChat(e.target.value)}
                      disabled={sending}
                      required
                      className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="px-3 sm:px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm sm:text-base"
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <p className="text-gray-300 text-sm sm:text-base">
                  Select an item to view the conversation.
                </p>
              )}
            </div>
            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!              My items    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          </div>
        ) : showItems ? (
          <div className="w-full max-w-2xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
              My Items
            </h2>
            {loading ? (
              <p className="text-gray-300 text-sm sm:text-base">
                Loading items...
              </p>
            ) : items.length === 0 ? (
              <p className="text-gray-300 text-sm sm:text-base">
                No items found.
              </p>
            ) : (
              <>
                <div className="flex flex-col items-center gap-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="w-full p-4 sm:p-6 bg-gray-700 rounded-xl shadow-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="w-full h-32 sm:h-40 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
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
                                {item.address.street || ""}{" "}
                                {item.address.houseStreet || ""}
                                {item.address.city ? ", " : ""}
                                {item.address.city || ""}{" "}
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
                              {item.category || "N/A"}
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
                          className="px-4 sm:px-6 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                          View Details
                        </button>
                      </div>
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
          <div className="text-white text-center text-sm sm:text-base">
            Select an option from the sidebar
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;
