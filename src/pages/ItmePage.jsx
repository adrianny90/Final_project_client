import Map from "../components/Map";
import { useState } from "react";

const ItemMap = () => {

    const [position,setPosition] = useState([52.5200, 13.4050])

   return (
<>
<Map />
</>
    )
}

export default ItemMap;
