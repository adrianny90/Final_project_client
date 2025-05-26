import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const HighlightIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [35, 51],
  iconAnchor: [17, 51],
  popupAnchor: [1, -34],
  shadowSize: [51, 51],
  className: 'highlight-marker'
});

const Map = ({ items = [], center, selectedItem, onItemSelect }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && (center || selectedItem?.address?.location?.coordinates)) {
      const newCenter = selectedItem?.address?.location?.coordinates
        ? [selectedItem.address.location.coordinates[1], selectedItem.address.location.coordinates[0]]
        : center;
      map.flyTo(newCenter, 15);
    }
  }, [map, center, selectedItem]);

  // Default-Marker when nothing is selected
  const displayItems = items.length > 0 
    ? items 
    : [{
        id: 'default-marker',
        name: 'Berlin',
        title: 'Willkommen in Berlin!',
        description: 'Dies ist der Standard-Marker',
        location: { coordinates: [13.4050, 52.5200] }
      }];

  return (
    <MapContainer 
      className="map-container" 
      center={center || [52.5200, 13.4050]} 
      zoom={13} 
      scrollWheelZoom={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {displayItems.map((item) => {
        const coords = item?.address?.location?.coordinates;
        const position = Array.isArray(coords) && coords.lenght === 2
          ? [coords[1], coords[0]]
          : null;
        if (!position) return null;
        
        const isSelected = selectedItem && selectedItem.id === item.id;
        const isDefaultMarker = item.id === 'default-marker';

        return (
          <Marker
            key={item.id}
            position={position}
            icon={isSelected ? HighlightIcon : DefaultIcon}
            eventHandlers={{
              click: () => !isDefaultMarker && onItemSelect && onItemSelect(item),
            }}
          >
            <Popup>
              <div>
                <h3>{item.title || item.name}</h3>
                {!isDefaultMarker && (
                  <>
                    <p>{item.description}</p>
                    {item.category && <p>Category: {item.category}</p>}
                    {isSelected && <p>✓ Selected</p>}
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;