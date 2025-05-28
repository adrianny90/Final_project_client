import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import Spinner from "../components/Spinner.jsx";

const RequestForm = ({ isModal = false }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const dataToSend = {
        title: formData.title,
        description: formData.description,
        userId: user?._id,
      };

      const response = await axios.post(
        "http://localhost:3000/items",
        dataToSend
      );

      // reset Form after sending data
      setFormData({
        title: "",
        description: "",
      });
      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Failed to submit request", error);
      alert("Error: Submitting a request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`p-4 bg-gray-900 ${
        isModal ? "" : "max-w-xl mx-auto rounded-xl shadow-md"
      }`}
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            disabled={submitting}
            required
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
          />
        </div>
        {/* Description */}
        <div>
          <p>Description</p>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            disabled={submitting}
            required
            rows={4}
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="block mx-auto w-30 bg-gray-600 font-bold text-white p-2 rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/* Spinner */}
      {submitting && <Spinner />}
    </div>
  );
};

export default RequestForm;
