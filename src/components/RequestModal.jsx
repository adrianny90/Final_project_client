const RequestModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="text-red-600 text-2xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RequestModal;
