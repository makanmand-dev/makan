'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import { useLocation } from './context/LocationContext';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMarker() {
  const { setLocation } = useLocation();
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          setLocation({
            lat,
            lng,
            address: data.display_name,
          });
        });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPanel() {
  return (
    <div className="flex flex-col items-start justify-start p-4 space-y-4 w-full h-full">
      <h2 className="text-lg font-bold hidden group-hover:block">نقشه ملک</h2>
      <div className="flex-1 w-full">
        <MapContainer center={[35.6892, 51.389]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}
