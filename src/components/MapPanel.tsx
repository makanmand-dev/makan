'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { useLocation } from '@/context/LocationContext';

export default function MapPanel() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('مکانی انتخاب نشده');
  const [confirmed, setConfirmed] = useState(false);
  const { setLocation } = useLocation();

  async function getLocationName(lat: number, lng: number) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      const { city, town, village, suburb, state } = data?.address || {};
      const name = city || town || village || suburb || state || 'ناشناس';
      setAddress(name);
    } catch {
      setAddress('نامشخص');
    }
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setConfirmed(false);
        getLocationName(lat, lng);
      }
    });
    return position ? <Marker position={position} /> : null;
  }

  const handleConfirm = () => {
    if (position && address) {
      setLocation({ lat: position[0], lng: position[1], address });
      setConfirmed(true);
    }
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <MapContainer center={[32.65, 51.67]} zoom={13} style={{ flex: 1 }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div style={{ padding: '0.75rem', background: '#fff', fontSize: '0.85rem', textAlign: 'center', borderTop: '1px solid #ccc' }}>
        {position ? (
          <>
            📍 محل انتخاب‌شده: <strong>{address}</strong>
            {!confirmed && (
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={handleConfirm} style={{ padding: '0.3rem 1rem', background: '#0077cc', color: '#fff', border: 'none', borderRadius: 4 }}>
                  تأیید این محل
                </button>
              </div>
            )}
            {confirmed && <div style={{ color: 'green', marginTop: '0.5rem' }}>✅ تأیید شد</div>}
          </>
        ) : (
          'برای انتخاب محل ملک روی نقشه کلیک کنید.'
        )}
      </div>
    </div>
  );
}
