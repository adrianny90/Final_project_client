import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import {OpenStreetMapProvider} from 'leaflet-geosearch'

const ItemMap = () => {
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    street: "",
    number: "",
    postalCode: "",
    city: "",
  });
  const [position, setPosition] = useState([52.5200, 13.4050]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRadius, setSelectedRadius] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle map clicks to update position
  const handleClickOnMap = (latLng) => {
    setPosition([latLng.lat, latLng.lng]);
  };

  // Handle marker drag to update position
  const handleCenterChange = (newCenter) => {
    setPosition(newCenter);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (selectedCategory) params.append("category", selectedCategory);
        if (searchQuery) params.append("search", searchQuery);

        if (selectedRadius) {
          params.append("lat", position[0]); // lat
          params.append("lng", position[1]); // lng
          params.append("radius", selectedRadius); // Meter
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/items?${params.toString()}`
        );
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, selectedRadius, searchQuery, position]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);

    if (item?.address?.location?.coordinates) {
      setPosition([
        item.address.location.coordinates[1], // lat
        item.address.location.coordinates[0], // lng
      ]);
    }
  };

  const osmProvider = new OpenStreetMapProvider({
    params: {
      countrycodes: 'de',
      addressdetails: 1,
    },
  });

  const handleAddressSearch = async () => {
    if (!address.street || !address.postalCode || !address.city) {
      alert("Please fill in street, postal code, and city.");
      return;
    }

    try {
      setLoading(true);
      const query = `${address.street} ${address.number}, ${address.postalCode} ${address.city}`;
      const results = await osmProvider.search({ query });

      if (results.length > 0) {
        // result is  [lon, lat]
        const { x: lon, y: lat } = results[0];
        console.log(results)
        setPosition([lat, lon]); // converting [lat, lng]
      } else {
        alert("Address not found. Please check your input.");
      }
    } catch (error) {
      console.error("Searching address failed:", error);
      alert("Error searching address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mapPage-Container">
      <fieldset className="fieldset-map">
        {/* Search by item */}
        <input
          className="category-div mb-5 mt-5"
          type="text"
          placeholder="What do you look for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category */}
        <CategorySelect value={selectedCategory} onChange={setSelectedCategory} />

        {/* Radius Dropdown */}
        <select
          value={selectedRadius}
          onChange={(e) => setSelectedRadius(e.target.value)}
          name="distance"
          id="distance"
          className="category-div mt-5"
        >
          <option value="">Choose distance</option>
          <option value="1000">1 km</option>
          <option value="3000">3 km</option>
          <option value="5000">5 km</option>
          <option value="10000">10 km</option>
          <option value="15000">15 km</option>
        </select>

        {/* Structured Address Input */}
        <div className="category-div mt-5 address-inputs">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleAddressChange}
            className="address-field"
          />
          <input
            type="text"
            name="number"
            placeholder="Number"
            value={address.number}
            onChange={handleAddressChange}
            className="address-field small"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleAddressChange}
            className="address-field medium"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            className="address-field"
          />
          <button
            className="search-btn"
            onClick={handleAddressSearch}
            disabled={loading}
          > Search
          </button>
        </div>

        {loading && <Spinner />}
      </fieldset>

      {/* Map */}
      <div className="map1">
        <Map
          key={`${position[0]}-${position[1]}-${selectedRadius}`}
          items={items}
          center={position}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          radius={parseInt(selectedRadius)}
          address={address}
          onMapClick={handleClickOnMap}
          onCenterChange={handleCenterChange}
        />
      </div>
    </div>
  );
};

export default ItemMap;