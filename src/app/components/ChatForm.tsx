'use client';
import { useEffect, useState } from 'react';
import { extractInfoFromText } from '@/lib/extractInfoFromText';

const questions = [
  { key: 'type', text: 'نوع ملک؟ (آپارتمان، زمین، ویلا...)' },
  { key: 'area', text: 'متراژ چقدره؟' },
  { key: 'location', text: 'کجاست؟ شهر یا منطقه؟' },
  { key: 'priceRange', text: 'حدود قیمت چنده؟' },
  { key: 'contact', text: 'شماره تماس برای پیگیری؟' }
];

export default function ChatForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages([
      'سلام! به مکانمند خوش اومدی 👋',
      'ما اینجا هستیم تا اطلاعات ملک‌تو راحت و دقیق ثبت کنیم.',
      'کافیه فقط اطلاعات ملک‌تو بنویسی؛ مثلاً:',
      '● یه آپارتمان ۸۵ متری تو شیراز دارم، حدود ۳ میلیارد',
      'یا اگر ترجیح می‌دی، به سؤالات ساده زیر پاسخ بده.',
      `– ${questions[0].text}`
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, `● ${input}`];
    const extracted = extractInfoFromText(input);
    const cleaned = Object.fromEntries(Object.entries(extracted).filter(([_, val]) => val && val.trim() !== ''));
    const updatedForm = { ...formData, ...cleaned };

    setFormData(updatedForm);
    const unanswered = questions.map(q => q.key).filter(key => !updatedForm[key]);

    if (unanswered.length > 0) {
      const nextKey = unanswered[0];
      const nextQ = questions.find(q => q.key === nextKey);
      if (nextQ) newMessages.push(`– ${nextQ.text}`);
    } else {
      newMessages.push('⏳ در حال ارسال اطلاعات...');
      try {
        const res = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedForm)
        });
        const json = await res.json();
        if (json.success) {
          newMessages.push('✅ اطلاعات ثبت شد.');
          questions.forEach(q => {
            newMessages.push(`${q.text} ${updatedForm[q.key]}`);
          });
        } else {
          newMessages.push('❌ خطا در ثبت اطلاعات: ' + json.error);
        }
        setFormData({});
      } catch {
        newMessages.push('❌ خطای شبکه!');
      }
    }

    setMessages(newMessages);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
        {messages.map((msg, i) => <div key={i} style={{ marginBottom: '0.5rem' }}>{msg}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="پاسخ شما..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSend} style={{ padding: '0.5rem 1rem', background: '#0a9396', color: '#fff', border: 'none', borderRadius: '4px' }}>
          ارسال
        </button>
      </div>
    </div>
  );
}