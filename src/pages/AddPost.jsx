import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";
import CategorySelect from "../components/CategorySelect";
import PhotoUpload from "../components/PhotoUpload";
import axios from "axios";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  //storage for formdata
  const [formData, setFormData] = useState({
    postType: "Offer",
    title: "",
    category: "",
    description: "",
    photos: [],
    collectionTime: "",
    address: {
      street: "",
      houseStreet: "",
      postalCode: "",
      city: "",
      location: {
        type: "Point",
        coordinates: [],
      },
    },
  });

  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]); //storage for photo preview
  const [isSubmitting, setIsSubmitting] = useState(false);

  //storing input data while typing
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      const selectedFiles = Array.from(files); //creating array from uploaded imgs, each img is an element in the array

      //upload limit = 5 photos
      if (formData.photos.length + selectedFiles.length > 5) {
        toast.error("Maximum 5 photos are possible to upload");
        return;
      }
      //setError(null);

      const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));

      //adding photos to form data
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles],
      }));
      setPreviewUrls((prev) => [...prev, ...newUrls]); //showing existing and new photos in preview
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //delete photos
const handleRemovePhoto = (indexToRemove) => {
  setFormData((prev) => ({
    ...prev,
    photo:prev.photos.filter((_,i)=> i !== indexToRemove),
  }));
  setPreviewUrls((prev) => prev.filter((_,i)=> i !== indexToRemove));
};

  //transforming address to coordinates and transforming into geojson
  const getCoordinatesFromAddress = async () => {
    const { street, houseStreet, postalCode, city } = formData.address;
    const fullAddress = `${street} ${houseStreet}, ${postalCode} ${city}`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullAddress
    )}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        toast.error("No coordinates found for the given address");
        return null;
      }

      const { lat, lon } = data[0];
      return [parseFloat(lon), parseFloat(lat)];
    } catch (error) {
      toast.error(error.message || "Error fetching coordinates");
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setError(null);

    try {
      setIsSubmitting(true);

      const coordinates = await getCoordinatesFromAddress();
      const uploadedPhotoUrls =
        formData.photos.length > 0
          ? await cloudinaryUpload(formData.photos)
          : [];

      const dataToSend = {
        postType: formData.postType,
        title: formData.title,
        description: formData.description,
        userId: user._id,
        category: formData.category,
        photos: uploadedPhotoUrls,
        address: {
          ...formData.address,
          location: {
            type: "Point",
            coordinates: coordinates,
          },
        },
        collectionTime: formData.collectionTime,
      };

      console.log("data to send:", dataToSend);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/items`,
        dataToSend
      );

      // Reset form and previews only if submission succeeds
      setFormData({
        postType: "Offer",
        title: "",
        category: "",
        description: "",
        photos: [],
        collectionTime: "",
        address: {
          street: "",
          houseStreet: "",
          postalCode: "",
          city: "",
          location: {
            type: "Point",
            coordinates: [],
          },
        },
      });

      setPreviewUrls([]);
      toast.success("Item submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-black text-center">
        Add an item
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Post Type Selection */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-4">
          <label className="text-black">I would like to</label>
          <label className="flex items-center space-x-2 text-black">
            <input
              type="radio"
              name="postType"
              value="Offer"
              checked={formData.postType === "Offer"}
              onChange={handleChange}
              disabled={isSubmitting}
              className="custom-radio"
            />
            <span>Offer</span>
          </label>
          <label className="flex items-center space-x-2 text-black">
            <input
              type="radio"
              name="postType"
              value="Request"
              checked={formData.postType === "Request"}
              onChange={handleChange}
              disabled={isSubmitting}
              className="custom-radio"
            />
            <span>Request</span>
          </label>
        </div>

        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            className="w-full border border-black rounded-md p-2 text-black"
          />
        </div>

        {/* Category */}
        <CategorySelect value={formData.category} onChange={handleChange} />

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-black">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a description here..."
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            rows={4}
            className="w-full border border-black rounded-md p-2 text-black placeholder-gray-500 truncate whitespace-nowrap"
          />
        </div>

        {/* Photo Upload */}
        <PhotoUpload
          previewUrls={previewUrls}
          //error={error}
          onChange={handleChange}
          onRemove={handleRemovePhoto}
        />

        {/* Collection Time */}
        <div>
          <label htmlFor="collectionTime" className="block text-black">
            Collection time (optional)
          </label>
          <input
            type="text"
            id="collectionTime"
            name="collectionTime"
            value={formData.collectionTime}
            disabled={isSubmitting}
            onChange={handleChange}
            className="w-full border border-black rounded-md p-2 text-black"
          />
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="address.street" className="block text-black">
              Street
            </label>
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-black rounded-md p-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="address.houseStreet" className="block text-black">
              House number
            </label>
            <input
              type="text"
              id="address.houseStreet"
              name="address.houseStreet"
              value={formData.address.houseStreet}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-black rounded-md p-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="address.postalCode" className="block text-black">
              Postal Code
            </label>
            <input
              type="text"
              id="address.postalCode"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-black rounded-md p-2 text-black"
            />
          </div>

          <div>
            <label htmlFor="address.city" className="block text-black">
              City
            </label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-black rounded-md p-2 text-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full max-w-xs bg-gray-600 font-bold text-white p-2 rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 mx-auto block truncate whitespace-nowrap"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
