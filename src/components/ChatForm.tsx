'use client';

import { useState } from 'react';
import { useLocation } from './context/LocationContext';

export default function ChatForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { location } = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `شما: ${input}`]);

    // واکنش ساده
    if (input.includes('قیمت') || input.includes('متراژ')) {
      setMessages((prev) => [...prev, 'لطفاً مقدار دقیق را وارد کنید. مثلاً: 3 میلیارد یا 120 متر']);
    } else if (input.includes('ذخیره')) {
      if (location) {
        setMessages((prev) => [...prev, `موقعیت ${location.address} ذخیره شد.`]);
      } else {
        setMessages((prev) => [...prev, 'لطفاً ابتدا محل ملک را روی نقشه انتخاب کنید.']);
      }
    } else {
      setMessages((prev) => [...prev, 'ممنون، ادامه بدهید...']);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white p-4 border rounded h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 text-sm">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-l px-4 py-2 text-sm"
          placeholder="متن را وارد کنید..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r text-sm">
          ارسال
        </button>
      </form>
    </div>
  );
}
