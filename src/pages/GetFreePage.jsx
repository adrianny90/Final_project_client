import { useState } from "react";
import ItemGrid from "../components/ItemGrid.jsx";
import CategorySidebar from "../components/CategorySidebar.jsx";
import RequestModal from "../components/RequestModal.jsx";
import RequestForm from "../components/RequestForm.jsx";

const GetFreePage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-white">
      <div className="px-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Request
        </button>
      </div>

      <div className="flex mt-2">
        <CategorySidebar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
        <div className="flex-1">
          <ItemGrid selectedCategories={selectedCategories} />
        </div>
      </div>

      {/* Modal rendering */}
      <RequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create a request"
      >
        <RequestForm isModal={true} onClose={() => setShowModal(false)} />
      </RequestModal>
    </div>
  );
};

export default GetFreePage;
