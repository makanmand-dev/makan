'use client';

import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar';
import ChatForm from '../components/ChatForm';
import PropertyList from '../components/PropertyList';
import { LocationProvider } from '../components/context/LocationContext';

const MapPanel = dynamic(() => import('../components/MapPanel'), { ssr: false });

export default function HomePage() {
  return (
    <LocationProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <aside className="w-[250px] border-r bg-white shadow-md overflow-y-auto">
          <Sidebar />
          <PropertyList />
        </aside>
        <main className="flex-1 flex flex-col p-4 overflow-y-auto">
          <ChatForm />
        </main>
        <aside className="w-[350px] border-l bg-white shadow-md overflow-y-auto">
          <MapPanel />
        </aside>
      </div>
    </LocationProvider>
  );
}
