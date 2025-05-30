import '@/app/globals.css';
import MapPanel from '@/components/MapPanel';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'مکانمند - ثبت ملک',
  description: 'فرم گفت‌وگومحور برای ثبت اطلاعات ملک',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0, fontFamily: 'sans-serif', display: 'flex', height: '100vh' }}>
        {/* سایدبار راست - نقشه */}
        <aside style={{ width: '20%', background: '#e0e0e0', padding: '1rem' }}>
          <MapPanel />
        </aside>

        {/* محتوای اصلی - چت‌فرم */}
        <main style={{ flex: 1, background: '#f5f5f5', padding: '1rem', overflowY: 'auto' }}>
          {children}
        </main>

        {/* سایدبار چپ - پنل کاربر */}
        <aside style={{ width: '18%', background: '#d0d0d0', padding: '1rem' }}>
          <Sidebar />
        </aside>
      </body>
    </html>
  );
}
