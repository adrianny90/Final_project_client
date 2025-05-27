import { useContext, useEffect, useState } from "react";
import PhotoUpload from "../components/PhotoUpload";
import CategorySelect from "../components/CategorySelect";
import Map from "../components/Map.jsx";
// import formDataBuilder from "../utils/formDataBuilder.js";
import cloudinaryUpload from "../utils/cloudinarayUpload.js";
import axios from "axios";

import Spinner from "../components/Spinner.jsx";
import { AuthContext } from "../context/AuthContextProvider.jsx";
// import { useContext, createContext } from "react";

const AddPost = () => {

  const {user} = useContext(AuthContext);

  //storage for formdata
  const [formData, setFormData] = useState({
    photos: [],
    title: "",
    category: "",
    description: "",
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
  
  const [previewUrls, setPreviewUrls] = useState([]); //storage for photo preview
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

   //storing input data while typing
   const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      const selectedFiles = Array.from(files); //creating array from uploaded imgs, each img is an element in the array

      //upload limit = 5 photos
      if (formData.photos.length + selectedFiles.length > 5) {
        setError("Max 5 photos possible");
        return;
      }
      setError(null);

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

      //transforming address to coordinates and transforming into geojson
  const getCoordinatesFromAddress = async () => {
    const {street,houseStreet,postalCode,city} = formData.address;
    const fullAddress = `${street} ${houseStreet}, ${postalCode} ${city}`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullAddress
    )}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length ===0){
        throw new Error("No coordinates found for the given address");
      }
      const {lat,lon} = data[0];
      return [parseFloat(lon), parseFloat(lat)];

    } catch (error) {
      console.error("Error fetching coordinates")
      throw new Error("Failed to fetch coordinates for adress");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setIsSubitting(true);

      const coordinates = await getCoordinatesFromAddress();

      const uploadedPhotoUrls = await cloudinaryUpload(formData.photos);

      const dataToSend = {
        title: formData.title,
        userId: user?._id,
        category: formData.category,
        description: formData.description,
        collectionTime: formData.collectionTime,
        
        address:{
          ...formData.address,
          location:{
            type:"Point",
            coordinates: coordinates,
          },
        },
        photos: uploadedPhotoUrls,
      };

      console.log("data to send:", dataToSend);

      const response = await axios.post(  "http://localhost:3000/items",dataToSend);

      // reset form after sendeing data
      setFormData({
        photos: [],
        title: "",
        category: "",
        description: "",
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
      setSuccessMsg("Item submitted succesfully");
    } catch (error) {
      console.log("Error while submitting", error);
      setError(error.message || "Something went wrong while submitting");
    } finally {
      setIsSubitting(false);
    }
  };

  return (
    <div className="Item-container">
      <h2 className="item-header">Put a new item</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <PhotoUpload
          previewUrls={previewUrls}
          error={error}
          onChange={handleChange}
        />
        <div className="title-div">
          <label className="title-label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <CategorySelect value={formData.category} onChange={handleChange} />

        <div className="description-div">
          <label className="description-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            rows={8}
          />
        </div>
        <div className="collection-div">
          <label className=" collection-label" htmlFor="collectionTime">
            Collection times
          </label>
          <input
            type="text"
            id="collectionTime"
            name="collectionTime"
            value={formData.collectionTime}
            disabled={isSubmitting}
            onChange={handleChange}
          />
        </div>

        <div className="address-group">
          <label htmlFor="address.street">Street:</label>
          <input
            type="text"
            id="address.street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <label htmlFor="address.houseStreet">House number:</label>
          <input
            type="text"
            id="address.houseStreet"
            name="address.houseStreet"
            value={formData.address.houseStreet}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <label htmlFor="address.postalCode">Postal Code:</label>
          <input
            type="text"
            id="address.postalCode"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <label htmlFor="address.city">City:</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <button
            className="submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit offer"}
          </button>
        </div>
      </form>
      {/* <Spinner /> */}
      {isSubmitting && <Spinner />}
      {successMsg && <p className="succes-message">{successMsg}</p>}
      <div className="map-div">

                <Map />
      </div>
    </div>
    
  );
};

export default AddPost;
