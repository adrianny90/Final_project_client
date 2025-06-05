import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import haversine from 'haversine-distance';

const ItemMap = () => {
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    street: "",
    number: "",
    postalCode: "",
    city: "",
  });

  const [position, setPosition] = useState([52.5200, 13.4050]); // Berlin Center
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRadius, setSelectedRadius] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetching all item once
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // All the filtering in the frontend
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchQuery ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) : true;

    let matchesDistance = true;
    if (selectedRadius && item.address?.location?.coordinates) {
      const [lng, lat] = item.address.location.coordinates;
      const distance = haversine(
        { lat: position[0], lng: position[1] },
        { lat, lng }
      ); // Distance in m
      matchesDistance = distance <= parseInt(selectedRadius);
    }

    return matchesCategory && matchesSearch && matchesDistance;
  });

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
    params: { countrycodes: 'de', addressdetails: 1 },
  });

  const handleAddressSearch = async () => {
    if (!address.street || !address.postalCode || !address.city) {
      alert("Bitte Straße, PLZ und Stadt eingeben.");
      return;
    }

    try {
      setLoading(true);
      const query = `${address.street} ${address.number}, ${address.postalCode} ${address.city}`;
      const results = await osmProvider.search({ query });

      if (results.length > 0) {
        const { x: lon, y: lat } = results[0];
        setPosition([lat, lon]);
      } else {
        alert("Adresse nicht gefunden.");
      }
    } catch (error) {
      console.error("Fehler bei der Adresssuche:", error);
      alert("Fehler bei der Adresseingabe.");
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
        {/* search for item field */}
        <input
          className="category-div mb-5 mt-5"
          type="text"
          placeholder="What do you look for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* category filter */}
        <CategorySelect className="category-div" value={selectedCategory} onChange={setSelectedCategory} />

        {/* radius */}
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

        {/* address */}
        <div className="category-div mt-5 address-inputs">
          <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} className="address-field" />
          <input type="text" name="number" placeholder="Number" value={address.number} onChange={handleAddressChange} className="address-field small" />
          <input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleAddressChange} className="address-field medium" />
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} className="address-field" />
          <button className="search-btn" onClick={handleAddressSearch} disabled={loading}>Search</button>
        </div>

        {loading && <Spinner />}
      </fieldset>

      {/* MAP */}
      <div className="map1">
        <Map
          // key={`${position[0]}-${position[1]}-${selectedRadius}`}
          items={filteredItems} //
          center={position}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          radius={parseInt(selectedRadius)} // circle
          address={address}
          onCenterChange={setPosition}
          // onMapClick={handleClickOnMap}
        />
      </div>
    </div>
  );
};

export default ItemMap;
