'use client';

import { useEffect, useState } from 'react';
import { extractInfoFromText } from '@/lib/extractInfoFromText';
import { useLocation } from '@/context/LocationContext';

const questions = [
  { key: 'type', text: 'نوع ملک؟ (آپارتمان، زمین، ویلا...)' },
  { key: 'area', text: 'متراژ چقدره؟' },
  { key: 'priceRange', text: 'حدود قیمت چنده؟' },
  { key: 'contact', text: 'شماره تماس برای پیگیری؟' }
];

export default function ChatForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [input, setInput] = useState('');
  const [askedKeys, setAskedKeys] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'asking' | 'confirmed' | 'done'>('asking');
  const { location } = useLocation();

  const resetForm = () => {
    setMessages([
      'سلام! به مکانمند خوش اومدی 👋',
      'ما اینجا هستیم تا اطلاعات ملک‌تو راحت و دقیق ثبت کنیم.',
      'کافیه فقط اطلاعات ملک‌تو بنویسی؛ مثلاً:',
      '● یه آپارتمان ۸۵ متری تو شیراز سه راه مهران دارم، حدود ۳ میلیارد',
      'یا اگر ترجیح می‌دی، به سؤالات ساده زیر پاسخ بده.',
      `– ${questions[0].text}`
    ]);
    setFormData({});
    setInput('');
    setAskedKeys(new Set(['type']));
    setStatus('asking');
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    let newMessages = [...messages, `● ${input}`];

    if (status === 'confirmed') {
      const answer = input.trim().toLowerCase();
      if (['بله', 'بلی', 'آره', 'باشه', 'ثبت کن'].includes(answer)) {
        newMessages.push('✅ عالی! لطفاً اطلاعات ملک بعدی را وارد کن.');
        setMessages(newMessages);
        resetForm();
      } else {
        newMessages.push('🙏 ممنون از همراهی‌تون. به امید دیدار.');
        setMessages(newMessages);
        setStatus('done');
      }
      setInput('');
      return;
    }

    const extracted = extractInfoFromText(input);
    const cleaned = Object.fromEntries(
      Object.entries(extracted).filter(([_, val]) => val?.trim() !== '')
    );
    const updatedForm = { ...formData, ...cleaned };
    setFormData(updatedForm);

    const unanswered = questions
      .map(q => q.key)
      .filter(key => {
        const val = updatedForm[key];
        return typeof val !== 'string' || val.trim() === '';
      });

    // اگر همه چیز پر شده ولی location روی نقشه مشخص نشده
    if (unanswered.length === 0 && (!location?.lat || !location?.lng)) {
      newMessages.push('📍 لطفاً ابتدا محل ملک را روی نقشه انتخاب و تأیید کن.');
      setMessages(newMessages);
      setInput('');
      return;
    }

    if (unanswered.length > 0) {
      const nextKey = unanswered[0];
      const nextQ = questions.find(q => q.key === nextKey);
      if (nextQ && !askedKeys.has(nextKey)) {
        newMessages.push(`– ${nextQ.text}`);
        setAskedKeys(new Set([...askedKeys, nextKey]));
      }
    }

    // اگر همه چیز پره و location مشخص شده، ارسال به دیتابیس
    if (unanswered.length === 0 && location?.lat && location?.lng && location?.address) {
      newMessages.push('⏳ در حال ثبت اطلاعات...');
      const finalData = {
        ...updatedForm,
        lat: location.lat,
        lng: location.lng,
        locationAddress: location.address
      };

      try {
        const res = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
        const json = await res.json();
        if (json.success) {
          newMessages.push('✅ اطلاعات ملک با موفقیت ثبت شد.');
          questions.forEach(q => {
            newMessages.push(`${q.text} ${updatedForm[q.key]}`);
          });
          newMessages.push(`📍 آدرس نقشه: ${location.address}`);
          newMessages.push('💬 آیا می‌خوای ملک دیگه‌ای رو ثبت کنی؟ (بله / نه)');
          setStatus('confirmed');
        } else {
          newMessages.push('❌ خطا در ثبت اطلاعات: ' + json.error);
        }
      } catch {
        newMessages.push('❌ خطای شبکه! دوباره تلاش کن.');
      }
    }

    setMessages(newMessages);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>{msg}</div>
        ))}
      </div>
      {status !== 'done' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="پاسخ شما..."
            style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSend}
            style={{ padding: '0.5rem 1rem', background: '#0a9396', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            ارسال
          </button>
        </div>
      )}
    </div>
  );
}
