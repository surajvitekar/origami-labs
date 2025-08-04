'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai'; // Import the new transport class

export default function AgentPlayground() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent',
    }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Agent Playground</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error.message}
          </div>
        )}

        <div className="h-[600px] overflow-y-auto mb-4 space-y-4">
          {messages.map((message: UIMessage) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className="flex flex-col max-w-[80%]">
                <span className="text-xs text-gray-500 mb-1">
                  {message.role === 'assistant' ? 'Assistant' : 'You'}
                </span>
                {message.parts.map((part, i) =>
                  part.type === 'text' ? (
                    <div
                      key={i}
                      className={`rounded-lg p-4 ${
                        message.role === 'assistant'
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {part.text}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}

          {status === 'streaming' && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={status !== 'ready'}
            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status !== 'ready'}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'streaming' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}