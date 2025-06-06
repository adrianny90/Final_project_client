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
  const [owner, setOwner] = useState([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

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
      toast.info("Changes are made! 👋", {
        ariaLabel: "Submitted",
      });
    } catch (error) {
      toast.error("Something went wrong, try again later. 😕", {
        ariaLabel: "Submit error",
      });
    }
  };

  useEffect(() => {
    if (showMessage) {
      const fetchMessagesAndItems = async () => {
        setLoading(true);
        try {
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
          const messagesData = await res.json();
          console.log("Messages Data:", messagesData);
          setMessages(messagesData || []);

          const itemIds = [...new Set(messagesData.map((msg) => msg.itemId))];

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
          setItems(itemsData || []);

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
            throw new Error("Failed to fetch owners");
          }
          const ownersDetails = await ownersRes.json();
          // setOwner(Array.isArray(ownersDetails) ? ownersDetails : []);
          console.log("Owner Data:", ownersDetails);

          const userIds = [
            ...new Set(
              messagesData.flatMap((msg) => [msg.senderId, msg.receiverId])
            ),
          ].filter((id) => id !== user._id);
          console.log("User IDs for related users:", userIds);

          const relatedUsersRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/related`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(userIds),
            }
          );
          if (!relatedUsersRes.ok) {
            throw new Error("Failed to fetch related users");
          }
          const relatedUsers = await relatedUsersRes.json();
          console.log("Related Users Data:", relatedUsers);

          const allUsers = [
            ...(Array.isArray(relatedUsers) ? relatedUsers : []),
            ...(Array.isArray(ownersDetails) ? ownersDetails : []),
          ];
          const uniqueUsers = Array.from(
            new Map(allUsers.map((u) => [u._id, u])).values()
          );
          console.log("Combined Users:", uniqueUsers);
          setOwner(uniqueUsers);
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

  useEffect(() => {
    if (selectedItemId && messages.length) {
      const recipients = getConversationRecipients(selectedItemId._id);
      console.log("Recipients:", recipients);
      if (recipients.length > 0) {
        setSelectedRecipientId(recipients[0].id);
      } else {
        setSelectedRecipientId(null);
      }
    } else {
      setSelectedRecipientId(null);
    }
  }, [selectedItemId, messages]);

  const getConversationRecipients = (itemId) => {
    if (!itemId) return [];

    const itemMessages = messages.filter((msg) => msg.itemId === itemId);
    console.log("Item Messages:", itemMessages);

    const recipientIds = [
      ...new Set(
        itemMessages.map((msg) =>
          msg.senderId === user._id ? msg.receiverId : msg.senderId
        )
      ),
    ].filter((id) => id !== user._id);

    console.log("Recipient IDs:", recipientIds);

    return recipientIds
      .map((id) => {
        const ownerData = owner.find((o) => o._id === id);
        return {
          id,
          firstName: ownerData?.firstName || "Anonymous",
        };
      })
      .filter((recipient) => recipient.firstName);
  };

  const getConversationMessages = (itemId, recipientId) => {
    if (!itemId) return [];

    let filteredMessages = messages.filter((msg) => msg.itemId === itemId);

    if (recipientId) {
      filteredMessages = filteredMessages.filter(
        (msg) =>
          (msg.senderId === user._id && msg.receiverId === recipientId) ||
          (msg.senderId === recipientId && msg.receiverId === user._id)
      );
    }

    console.log("Filtered Messages:", filteredMessages);

    return filteredMessages.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateA - dateB;
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chat.trim() || !selectedItemId?._id || !selectedRecipientId) {
      console.log("Validation failed:", {
        chat: chat.trim(),
        selectedItemId,
        selectedRecipientId,
      });
      toast.error("Please select a recipient and enter a message.");
      return;
    }

    try {
      setSending(true);
      let dataToSend = {};

      if (selectedItemId.userId === user._id) {
        dataToSend = {
          content: chat,
          receiverId: selectedRecipientId,
          senderId: user._id,
          itemId: selectedItemId._id,
          ownerId: user._id,
        };
      } else {
        dataToSend = {
          content: chat,
          receiverId: selectedItemId.userId,
          senderId: user._id,
          itemId: selectedItemId._id,
          ownerId: selectedItemId.userId,
        };
      }

      console.log("data sent:", dataToSend);

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

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;
    // console.log(itemId, "here is item ID");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/items/${itemId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        toast.info("Item deleted successfully! 👋", {
          ariaLabel: "Delete confirmation",
        });

        if (selectedItemId?._id === itemId) {
          setSelectedItemId(null);
          setSelectedRecipientId(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error(error.response?.data?.message || "Error deleting item.");
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
                        selectedItemId?._id === item._id
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
                        {(owner?.length &&
                          owner.find((o) => o._id === item.userId)
                            ?.firstName) ||
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
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {getConversationRecipients(selectedItemId._id).length >
                    0 ? (
                      getConversationRecipients(selectedItemId._id).map(
                        (recipient) => (
                          <button
                            key={recipient.id}
                            onClick={() => setSelectedRecipientId(recipient.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-colors duration-200 ${
                              selectedRecipientId === recipient.id
                                ? "bg-blue-600 ring-2 ring-blue-400"
                                : "bg-gray-600 hover:bg-gray-500"
                            }`}
                            title={recipient.firstName}
                          >
                            {recipient.firstName[0]?.toUpperCase() || "?"}
                          </button>
                        )
                      )
                    ) : (
                      <p className="text-gray-300 text-sm">
                        No recipients found.
                      </p>
                    )}
                  </div>
                  <div
                    className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-700 rounded-lg"
                    ref={(el) => {
                      if (el) {
                        el.scrollTop = el.scrollHeight;
                      }
                    }}
                  >
                    {getConversationMessages(
                      selectedItemId._id,
                      selectedRecipientId
                    ).length > 0 ? (
                      getConversationMessages(
                        selectedItemId._id,
                        selectedRecipientId
                      ).map((message) => (
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
                                  {owner.find((o) => o._id === message.senderId)
                                    ?.firstName?.[0] || "?"}
                                </div>
                              )}
                              <p className="font-semibold text-xs sm:text-sm">
                                {message.senderId === user._id
                                  ? user.firstName || "You"
                                  : owner.find(
                                      (o) => o._id === message.senderId
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
                      ))
                    ) : (
                      <p className="text-gray-300 text-sm sm:text-base">
                        {selectedRecipientId
                          ? "No messages with this recipient."
                          : "No messages found for this item."}
                      </p>
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
                      disabled={sending || !selectedRecipientId}
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
                      <div className="flex justify-end  mt-4 ">
                        {" "}
                        <button
                          onClick={() => handleDelete(item._id)}
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
