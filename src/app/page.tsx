'use client';

import dynamic from 'next/dynamic';
import ChatForm from '@/components/ChatForm';
import Sidebar from '@/components/Sidebar';

// اینجا فایل MapPanel رو فقط روی کلاینت بارگذاری می‌کنیم
const MapPanel = dynamic(() => import('@/components/MapPanel'), { ssr: false });

export default function Home() {
  return (
    <main style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '20%', minWidth: '200px', background: '#f2f2f2', borderLeft: '1px solid #ccc' }}>
        <Sidebar />
      </aside>
      <section style={{ flex: 1, padding: '1rem', background: '#fff' }}>
        <ChatForm />
      </section>
      <aside style={{ width: '25%', minWidth: '300px', background: '#f9f9f9', borderRight: '1px solid #ccc' }}>
        <MapPanel />
      </aside>
    </main>
  );
}
