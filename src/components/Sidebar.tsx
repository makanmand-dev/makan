'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Sidebar() {
  const [properties, setProperties] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  const fetchProperties = async () => {
    const { data, error } = await supabase.from('properties').select('*').order('id', { ascending: false });
    if (!error && data) {
      setProperties(data);
      setShowList(true);
    } else {
      alert('خطا در دریافت اطلاعات');
    }
  };

  return (
    <div>
      <button
        onClick={fetchProperties}
        style={{
          padding: '0.5rem 1rem',
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          marginBottom: '1rem'
        }}
      >
        📋 مشاهده املاک ثبت‌شده
      </button>

      {showList && (
        <div style={{ maxHeight: '400px', overflowY: 'auto', fontSize: '0.9rem' }}>
          {properties.length === 0 && <p>هیچ ملکی ثبت نشده.</p>}
          {properties.map((item, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
              <div><strong>🏠 نوع:</strong> {item.type}</div>
              <div><strong>📍 موقعیت:</strong> {item.location}</div>
              <div><strong>📏 متراژ:</strong> {item.area} متر</div>
              <div><strong>💰 قیمت:</strong> {item.price_range}</div>
              <div><strong>📞 تماس:</strong> {item.contact}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
