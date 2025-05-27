import { useAuth } from "../hooks/useAuth.js";
import { useEffect, useState } from "react";

const Panel = () => {
  const { setUser, user } = useAuth();
  const [showData, setShowData] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showItems, setShowItems] = useState(false);

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
  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 p-4 flex flex-col gap-2">
        <button
          onClick={handlePersonalData}
          className={`w-full py-3 px-4 rounded-lg text-left text-white font-medium transition-all duration-200 ${
            showData
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-900 hover:bg-blue-800"
          }`}
        >
          Personal Data
        </button>
        <button
          onClick={handleMessages}
          className={`w-full py-3 px-4 rounded-lg text-left text-white font-medium transition-all duration-200 ${
            showMessage
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-900 hover:bg-blue-800"
          }`}
        >
          Messages
        </button>
        <button
          onClick={handleItems}
          className={`w-full py-3 px-4 rounded-lg text-left text-white font-medium transition-all duration-200 ${
            showItems
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-900 hover:bg-blue-800"
          }`}
        >
          My Items
        </button>
      </div>

      <div className="flex-1 p-8">
        {showData ? (
          <form className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white font-semibold mb-6">
              Personal Information
            </h2>
            <label className="block mb-4">
              <span className="text-gray-300">First name:</span>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={user.firstName || "Enter first name"}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Last name:</span>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={user.lastName || "Enter last name"}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Email:</span>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={user.email || "Enter email"}
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
          <div className="text-white">Messages </div>
        ) : showItems ? (
          <div className="text-white">My Items </div>
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
