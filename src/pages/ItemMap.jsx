import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";
import { fetchItemsByCategory,fetchAllItems } from "../utils/fetching";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const ItemMap = () => {

    const {user} = useContext(AuthContext);

    const [position,setPosition] = useState([52.5200, 13.4050])
    const [selectedCategory,setSelectedCategory] = useState('');
    const [selectedRadius,setSelectedRadius] = useState("")
    const [searchQuery,setSearchQuery] = useState("");

    const [items,setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
          setLoading(true);
    
          try {
           
            const params = new URLSearchParams();
    
            if (selectedCategory) params.append("category", selectedCategory);
            if (searchQuery)      params.append("search",   searchQuery);
    
            if (selectedRadius) {
              // Mittelpunkt = aktuelle Kartenposition
              params.append("lat",    position[0]); // lat
              params.append("lng",    position[1]); // lng
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
    
      /* -------------------------------------------------------------------- */
      /*                           Marker-Klick-Logik                          */
      /* -------------------------------------------------------------------- */
      const handleItemSelect = (item) => {
        setSelectedItem(item);
    
        // Karte auf Item zentrieren
        if (item?.address?.location?.coordinates) {
          setPosition([
            item.address.location.coordinates[1], // lat
            item.address.location.coordinates[0], // lng
          ]);
        }
      };
    
      /* -------------------------------------------------------------------- */
      /*                          Client-Seitige Suche                         */
      /* -------------------------------------------------------------------- */
      const filteredItems = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      /* -------------------------------------------------------------------- */
      /*                               RENDER                                  */
      /* -------------------------------------------------------------------- */
      return (
        <div className="mapPage-Container">
          <fieldset className="fieldset-map">
            {/* searching by item (text) */}
            <input
              className="category-div mb-5 mt-5"
              type="text"
              placeholder="What do you look for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
    
        {/* category */}
            <CategorySelect
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
    
            {/* Radius-Dropdown  */}
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
    
            {loading && <Spinner />}
          </fieldset>
    
          {/* Map */}
          <div className="map">
            <Map
              items={filteredItems}
              center={position}
              selectedItem={selectedItem}
              onItemSelect={handleItemSelect}
            />
    
            {/* Item-Popup */}
            {selectedItem && (
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded shadow-lg z-10">
                <h3 className="font-bold">{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default ItemMap;