import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language, PackageTierId } from '../types';
import { MessageSquare, Send, Sparkles, Bot, User, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

interface AIChatAssistantProps {
  lang: Language;
  userTier: PackageTierId;
  productCount: number;
  balance: number;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  lang,
  userTier,
  productCount,
  balance,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'আসসালামু আলাইকুম! আমি "পণ্যসেতু এআই সহকারী"। পাইকারি পণ্য নির্বাচন, ৮০% কমিশন হিসাব, অথবা বিকাশে (01924876491) পেমেন্ট করে প্যাকেজ স্লট আনলক করা নিয়ে যেকোনো প্রশ্ন করতে পারেন। আমি আপনাকে সেরা সাপোর্ট দেবো!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    '৮০% কমিশন কিভাবে হিসাব করবো?',
    'বিকাশে টাকা পাঠিয়ে ৫০টি প্রোডাক্ট স্লট কীভাবে আনলক করবো?',
    'ফেসবুক ও টিকটকে পণ্য বিক্রি বাড়ানোর ৩টি সিক্রেট টিপস দিন।',
    'প্রিমিয়াম, প্লাটিনাম ও ভিআইপি প্যাকেজের মধ্যে পার্থক্য কি?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          userTier,
          activeProductCount: productCount,
          totalEarned: balance,
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'ধন্যবাদ আপনার বার্তার জন্য। যেকোনো প্রয়োজনে আমরা পাশে আছি।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'আমাদের এআই সার্ভারে কিছুটা কানেকশন ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা সরাসরি টেলিগ্রাম চ্যানেলে জয়েন করুন (https://t.me/SmartSeller1199)।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 border border-indigo-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px]">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-indigo-800/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm sm:text-base">
              <span>পণ্যসেতু এআই স্মার্ট সেলস এসিস্ট্যান্ট</span>
              <span className="text-[10px] bg-indigo-900 text-indigo-200 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                Gemini 3.6 Flash
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ২৪/৭ রিসেলার সেলস গাইডেন্স, প্রাইসিং ক্যালকুলেশন ও প্যাকেজ সাপোর্ট
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all text-xs flex items-center gap-1"
          title="Clear chat history"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন চ্যাট</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
              <span className="text-[10px] opacity-60 block text-right font-mono">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none text-xs text-indigo-300 flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>এআই উত্তর তৈরি করছে...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset Quick Suggestions */}
      <div className="p-2 bg-slate-900/90 border-t border-slate-800 overflow-x-auto flex gap-2 no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-900/50 border border-indigo-500/30 text-indigo-200 text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="এআই হেল্পারকে আপনার প্রশ্নটি লিখুন (বাংলায়)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
