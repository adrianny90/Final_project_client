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
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [loading,setLoading] = useState(false);
    const [items,setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery,setSearchQuery] = useState("");


    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = selectedCategory
                    ? await fetchItemsByCategory(selectedCategory)
                    : await fetchAllItems();
                    console.log("Fetched items:", data)
                setItems(data);
            } catch (error) {
                console.error("Error fetching Items:", error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[selectedCategory]);

  
    
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        if(item?.address?.location?.coordinates){
            setPosition([
                item.address.location.coordinates[1],
                item.address.location.coordinates[0]
            ]);
        }
    };
    const filteredItems = items.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

   return (

<div className="mapPage-Container">
    
    <fieldset className="fieldset-map">
        <input className="category-div mb-5 mt-5" type="text" placeholder="what do you look for"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
        />
        <CategorySelect 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        />
        <label htmlFor="distance" className="text-black"></label>
        <select name="distance" id="distance" className="category-div mt-5">
            <option value="none">Distance</option>
            <option value="20">20 km</option>
            <option value="15">15 km</option>
            <option value="10">10 km</option>
            <option value="5">5 km</option>
            <option value="3">3 km</option>
            <option value="1">1 km</option>
        </select>
        {loading && <Spinner />}
    </fieldset>
    
    <div className="map">
            <Map items={filteredItems} 
            center= {position}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            />
            {selectedItem && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded shadow-lg z-10">
                  <h3 className="font-bold">{selectedItem.name}</h3>
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

    )
}

export default ItemMap;
