'use client';

import { useState } from 'react';
import { useLocation } from '@/context/LocationContext';

export default function ChatForm() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'سلام! لطفاً اطلاعات ملک را وارد کنید.' },
  ]);
  const [input, setInput] = useState('');
  const { location } = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    // اینجا فقط نمایش پیام و پاسخ شبیه‌سازی شده است.
    const reply = {
      role: 'assistant',
      content: `متشکرم! اطلاعات "${input}" دریافت شد.`,
    };

    setMessages([...newMessages, reply]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-xs ${
              msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200 mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {location?.address && (
          <div className="text-xs text-gray-500 mt-2">📍 آدرس انتخابی: {location.address}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="پیام خود را بنویسید..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}
