'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Enter a property address to begin your real estate analysis.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    setTimeout(() => {
      const botReply = { role: 'assistant', content: 'Test...' };
      setMessages([...updatedMessages, botReply]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="flex flex-col h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
        {/* Header */}
       <header className="flex justify-center items-center px-6 py-4 shadow dark:shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span role="img" aria-label="house">🏠</span> Real Estate Investment Wiz
          </h1>
      </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-300 dark:bg-zinc-700 dark:text-white text-black'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <div className="px-6 pb-6 mt-2 flex gap-2">
          <input
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white"
            placeholder="Enter a property address..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
