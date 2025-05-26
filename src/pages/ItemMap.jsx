import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";
import { fetchItemsByCategory,fetchAllItems } from "../utils/fetching";

const ItemMap = () => {

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

<div className="mapPage-Container bg-green-200">
    
    <fieldset className="fieldset-map">
        <input className="category-div" type="text" placeholder="what do you look for"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
        />
        <CategorySelect 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        />
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
