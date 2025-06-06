import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ItemCard from "./ItemCard";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const circleIcon = L.divIcon({
  iconSize: [20, 20],       
  iconAnchor: [10, 10],      
  className: "center-circle-marker",
});
const HighlightIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [35, 51],
  iconAnchor: [17, 51],
  popupAnchor: [1, -34],
  shadowSize: [51, 51],
  className: "highlight-marker",
});


const Map = ({ items = [],circleCenter, center, selectedItem, onItemSelect, radius,
   onCircleCenterChange, onMapClick }) => {
  const [map, setMap] = useState(null);
  // const [currentCenter, setCurrentCenter] = useState(center || [52.5200, 13.4050]);



  useEffect(() => {
    if (map && center) {
      map.flyTo(center, 15, {
        duration: 1,
      });
    }
  }, [map, center]);

  const displayItems = items.length > 0
    ? items
    : [{
        _id: "default-marker",
        name: "Berlin",
        title: "Willkommen in Berlin!",
        description: "Get free Items and help saving the planet",
        location: { coordinates: [13.4050, 52.5200] },
      }];
      //Center for distance
  const handleDrag = (e) => {
    const newCenter = e.target.getLatLng();
    if (onCircleCenterChange) {
      onCircleCenterChange([newCenter.lat, newCenter.lng]);
    }
  };

  return (
    <MapContainer
      className="map-container"
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      whenCreated={setMap}
      eventHandlers={{
        click: (e) => {
          if (onMapClick) {
            onMapClick(e.latlng);
          }
        },
      }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {radius && center &&(
        <>
          <Circle
            center={circleCenter}
            radius={parseInt(radius)}
            pathOptions={{ color: "blue", fillColor: "#a3cfff", fillOpacity: 0.3 }}
          />
          <Marker
            position={circleCenter}
            draggable={true}
            eventHandlers={{ dragend: handleDrag }}
            icon={circleIcon}
          >
            <Popup>Drag & Drop or set address</Popup>
          </Marker>
        </>
      )}
      {displayItems.map((item) => {
        const coords = item?.address?.location?.coordinates || item?.location?.coordinates;
        const position = Array.isArray(coords) && coords.length === 2
          ? [coords[1], coords[0]]
          : null;
        if (!position) return null;

        const isSelected = selectedItem && selectedItem._id === item._id;
        const isDefaultMarker = item._id === "default-marker";

        return (
          <Marker
            key={item._id || `${item.title}-${item.description}-${item.location?.coordinates[0]}-${item.location?.coordinates[1]}`}
            position={position}
            icon={isSelected ? HighlightIcon : DefaultIcon}
            eventHandlers={{
              click: () => !isDefaultMarker && onItemSelect && onItemSelect(item),
            }}
          >
            <Popup>
            {!isDefaultMarker ? <ItemCard item={item} /> : (
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;