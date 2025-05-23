import Map from "../components/Map";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect";
import Spinner from "../components/Spinner";
import axios from "axios";

const ItemMap = () => {

    const [position,setPosition] = useState([52.5200, 13.4050])
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [loading,setLoading] = useState(false);
    const [item,setItem] = useState([])

    useEffect(()=> {
        if(selectedCategory){
            fetchItemsByCategory();
        }
    },[selectedCategory]);

    const fetchItemsByCategory = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3000/items/category?${selectedCatgegory}`);
            setItem(res.data);

        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false)
        }   
    };

   return (
<>
<div className="mapPage-Container">
    
    <fieldset className="fieldset-map">
        <input className="category-div" type="text" placeholder="what do you look for" />
        <CategorySelect 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        />
        {loading && <Spinner />}
    </fieldset>
    
    <div className="map">
            <Map items={items}center ={position}/>

    </div>


</div>

</>
    )
}

export default ItemMap;
