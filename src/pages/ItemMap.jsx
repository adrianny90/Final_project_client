import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import haversine from 'haversine-distance';
import ItemCard from "../components/ItemCard";

const ItemMap = () => {
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    street: "",
    number: "",
    postalCode: "",
    city: "",
  });
  //State for actual mapposition
  const [position, setPosition] = useState([52.5200, 13.4050]); // Berlin Center
  //state for the distance circle
  const [circleCenter, setCircleCenter] = useState([52.5200, 13.4050]) // initial state at Center
  //filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRadius, setSelectedRadius] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //item states
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(false);
  //OSM Provider for Geocoding
  const osmProvider = new OpenStreetMapProvider({
    params: { countrycodes: 'de', addressdetails: 1 },
  });

  // fetching all items in first mount
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);
        setItems(res.data);
        console.log(res.data)
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
        { lat: circleCenter[0], lng: circleCenter[1] },
        { lat, lng }
      ); // Distance in m
      matchesDistance = distance <= parseInt(selectedRadius);
    }
    
    return matchesCategory && matchesSearch && matchesDistance;
  });

  const handleItemSelect = (item) => {
    if (item._id === "default-marker") return;
    setSelectedItem(item);
    if (item?.address?.location?.coordinates) {
      setPosition([
        item.address.location.coordinates[1], // lat
        item.address.location.coordinates[0], // lng
      ]);
    }
  };


  const handleAddressSearch = async () => {
    if (!address.street || !address.postalCode || !address.city) {
      alert("Street, postal code and city are required");
      return;
    }

    try {
      setLoading(true);
      const query = `${address.street} ${address.number}, ${address.postalCode} ${address.city}`;
      console.log('Address query:', query)
      const results = await osmProvider.search({ query });

      if (results.length > 0) {
        const { x: lon, y: lat } = results[0];
        setPosition([lat, lon]);
        setCircleCenter([lat, lon]);
      } else {
        alert("Address not found");
      }
    } catch (error) {
      console.error("Error finding the address", error);
      alert("Error while address input");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  // const handleCenterChange = (newCenter) => {
  //   setCircleCenter(newCenter); // Update circle center on drag
  //   setPosition(newCenter); // Optionally sync map center
  // };
const handleCircleCenterChange = (newCenter) => {
  setCircleCenter(newCenter);
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
        <CategorySelect 
        className="category-div" 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}

        
         />

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
          <button className="search-btn" onClick={handleAddressSearch} disabled={loading?true:false}>Search</button>
        </div>

        {loading && <Spinner />}
      </fieldset>

      {/* MAP */}
      <div className="map1">
        <Map
        
          items={filteredItems} 
          center={position}
          circleCenter={circleCenter}
          onCircleCenterChange={handleCircleCenterChange}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          radius={parseInt(selectedRadius)} // circle
          address={address}
          onCenterChange={setPosition}
      
        />
      </div>
    </div>
  );
};


export default ItemMap;
