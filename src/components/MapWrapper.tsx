'use client';

import dynamic from 'next/dynamic';
const MapPanel = dynamic(() => import('./MapPanel'), { ssr: false });

export default function MapWrapper() {
  return <MapPanel />;
}
