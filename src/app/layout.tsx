import './globals.css';

export const metadata = {
  title: 'مکانمند',
  description: 'سامانه هوشمند ثبت املاک',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
