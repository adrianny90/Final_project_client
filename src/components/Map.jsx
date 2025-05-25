import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DafaultIcon= L.icon({
  iconUrl:markerIcon,
  shadowUrl:markerShadow,
  iconSize:[25,41],
  iconAnchor:[12,41],
  popupAnchor:[1, -34],
  shadowSize: [41,41]
});


const Map = ({items =[],center}) => {

return (
    <MapContainer className="map-container" center={center||[52.5200, 13.4050]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     {items.map((item) => (
        <Marker 
          key={item.id} 
          position={[item.lat, item.lng]} 
          icon={DefaultIcon}
        >
          <Popup>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Category: {item.category}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;