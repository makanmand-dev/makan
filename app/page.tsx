import ChatForm from '../components/ChatForm';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>سلام مکانمند! 👋</h1>
      <p>در اینجا می‌تونی ملک خودتو با یه گفت‌وگو ساده ثبت کنی:</p>
      <ChatForm />
    </main>
  );
}
