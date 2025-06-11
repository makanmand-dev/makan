'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ChatForm from '@/components/ChatForm';
import Sidebar from '@/components/Sidebar';
import { LocationProvider } from '@/components/context/LocationContext';

const MapPanel = dynamic(() => import('@/components/MapPanel'), { ssr: false });

export default function HomePage() {
  return (
    <LocationProvider>
      <div className="flex min-h-screen">
        {/* سایدبار چپ */}
        <div className="w-1/5 bg-gray-100 border-r p-4">
          <Sidebar />
        </div>

        {/* محتوای میانی */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ChatForm />
        </div>

        {/* سایدبار راست */}
        <div className="w-1/3 bg-gray-50 border-l p-4">
          <MapPanel />
        </div>
      </div>
    </LocationProvider>
  );
}
