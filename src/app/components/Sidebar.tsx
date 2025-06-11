'use client';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex flex-col items-start justify-start p-4 space-y-4">
      {isOpen && (
        <>
          <h2 className="text-lg font-bold">پنل کاربری</h2>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer">🏠 ثبت ملک جدید</li>
            <li className="cursor-pointer">📋 مشاهده املاک</li>
            <li className="cursor-pointer">⚙️ تنظیمات</li>
          </ul>
        </>
      )}
    </div>
  );
}
