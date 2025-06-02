'use client';

import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import ChatForm from '@/components/ChatForm';

const MapPanel = dynamic(() => import('@/components/MapPanel'), { ssr: false });

export default function HomePage() {
  return (
    <main className="flex h-screen w-full bg-gray-100">
      <div className="w-[250px] border-r bg-white shadow-md overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <ChatForm />
      </div>
      <div className="w-[350px] border-l bg-white shadow-md overflow-y-auto">
        <MapPanel />
      </div>
    </main>
  );
}
