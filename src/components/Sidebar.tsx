'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type Property = {
  id: string;
  type: string;
  area: string;
  location: string;
  priceRange: string;
  contact: string;
  locationAddress?: string;
  lat?: number;
  lng?: number;
};

const supabaseUrl = 'https://vtumuuqcfbyobgrwsjfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dW11dXFjZmJ5b2JncndzamZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjE3NzksImV4cCI6MjA2Mzk5Nzc3OX0.3YjNM189Pw5ULM9Hzg3u2CnPT3qC18H3MedWuxpOECA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Sidebar() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data || []);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '1rem', overflowY: 'auto', height: '100%' }}>
      <h3 style={{ marginBottom: '1rem' }}>📋 لیست املاک ثبت‌شده</h3>
      {properties.length === 0 ? (
        <p>هیچ ملکی ثبت نشده.</p>
      ) : (
        properties.map((p) => (
          <div key={p.id} style={{ padding: '0.5rem', marginBottom: '0.75rem', background: '#fff', borderRadius: '6px', boxShadow: '0 0 5px rgba(0,0,0,0.05)' }}>
            <strong>{p.type}</strong> - {p.area} متر  
            <div>📍 {p.location || p.locationAddress}</div>
            <div>💰 {p.priceRange}</div>
            <div>📞 {p.contact}</div>
          </div>
        ))
      )}
    </div>
  );
}
