import { useState } from "react";
import PersonalDataPanel from "../components/PersonalDataPanel.jsx";
import MessagePanel from "../components/MessagePanel.jsx";
import ItemsPanel from "../components/ItemsPanel.jsx";

const Panel = () => {
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
          <PersonalDataPanel />
        ) : showMessage ? (
          <MessagePanel showMessage={showMessage} />
        ) : showItems ? (
          <ItemsPanel showItems={showItems} />
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
