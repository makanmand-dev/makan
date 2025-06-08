'use client';

import { useEffect, useState } from 'react';
import { useLocation } from '@/components/context/LocationContext';

export default function PropertyList() {
  const [properties, setProperties] = useState<any[]>([]);
  const { setLocation } = useLocation();

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(() => setProperties([]));
  }, []);

  return (
    <div className="p-3 overflow-y-auto h-full bg-white border-l border-gray-200">
      <h2 className="text-lg font-bold mb-3">املاک ثبت‌شده</h2>
      {properties.length === 0 && <p className="text-gray-500">هیچ ملکی ثبت نشده</p>}
      {properties.map((p, i) => (
        <div
          key={i}
          className="cursor-pointer p-2 rounded hover:bg-gray-100 text-sm border-b"
          onClick={() => {
            if (p.lat && p.lng && p.address) {
              setLocation({ lat: p.lat, lng: p.lng, address: p.address });
            }
          }}
        >
          <div><strong>🏠 نوع:</strong> {p.type}</div>
          <div><strong>📐 متراژ:</strong> {p.area}</div>
          <div><strong>💰 قیمت:</strong> {p.priceRange}</div>
          <div><strong>📍 آدرس:</strong> {p.address?.slice(0, 40)}...</div>
        </div>
      ))}
    </div>
  );
}
