'use client';
import React, { useState } from 'react';

const questions = [
  { key: 'type', text: 'نوع ملک؟ (مثلاً آپارتمان، زمین، مغازه...)' },
  { key: 'area', text: 'متراژ چقدره؟' },
  { key: 'location', text: 'موقعیت یا منطقه کجاست؟' },
  { key: 'priceRange', text: 'رنج قیمت حدودی چنده؟' },
  { key: 'contact', text: 'شماره تماس برای پیگیری؟' },
];

export default function ChatForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const currentQuestion = questions[step];

  const handleSend = () => {
    if (!input.trim()) return;

    // ذخیره جواب
    const newForm = { ...formData, [currentQuestion.key]: input };
    setFormData(newForm);

    // ثبت پیام‌ها
    setMessages([
      ...messages,
      `🤖 ${currentQuestion.text}`,
      `🧑 ${input}`,
    ]);

    // مرحله بعد
    setInput('');
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setMessages((prev) => [
        ...prev,
        '✅ اطلاعات ثبت شد. خلاصه ملک:',
        `📋 نوع: ${newForm.type}, متراژ: ${newForm.area}, منطقه: ${newForm.location}, قیمت: ${newForm.priceRange}, تماس: ${newForm.contact}`,
      ]);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '2rem auto',
      fontFamily: 'sans-serif',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: 8,
    }}>
      <h2>📩 ثبت ملک با گفت‌وگو</h2>

      <div style={{ minHeight: 200, marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 4 }}>{msg}</div>
        ))}
        {step < questions.length && (
          <div>🤖 {currentQuestion.text}</div>
        )}
      </div>

      {step < questions.length && (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="پاسخ شما..."
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button onClick={handleSend}>ارسال</button>
        </div>
      )}
    </div>
  );
}
