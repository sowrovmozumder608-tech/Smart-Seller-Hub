import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, PhoneCall, MessageCircle, Copy, Check, ShieldCheck, HelpCircle } from 'lucide-react';

interface TelegramSupportModalProps {
  lang: Language;
  onClose: () => void;
}

export const TelegramSupportModal: React.FC<TelegramSupportModalProps> = ({
  lang,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '01924876491';

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-sky-800/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {lang === 'bn' ? 'টেলিগ্রাম ও লাইভ সাপোর্ট সেন্টার' : 'Telegram & Live Support Center'}
            </h3>
            <p className="text-xs text-sky-300">
              {lang === 'bn' ? 'এডমিনের সাথে সরাসরি যোগাযোগ করুন' : 'Direct 24/7 Admin Helpline'}
            </p>
          </div>
        </div>

        {/* Number Display Box */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block">{lang === 'bn' ? 'বিকাশ / নগদ সেন্ড মানি (Send Money) নাম্বার:' : 'bKash / Nagad Send Money Number:'}</span>
            <span className="text-xl font-mono font-extrabold text-amber-300 tracking-wider">
              {phoneNumber}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
          </button>
        </div>

        {/* Action Direct Buttons */}
        <div className="space-y-3">
          <a
            href="https://t.me/SmartSeller1199"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{lang === 'bn' ? 'টেলিগ্রাম চ্যানেলে জয়েন করুন (@SmartSeller1199)' : 'Join Telegram Channel (@SmartSeller1199)'}</span>
          </a>

          <a
            href={`tel:${phoneNumber}`}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'সরাসরি ফোন কল করুন (01924876491)' : 'Direct Phone Call'}</span>
          </a>
        </div>

        {/* FAQ Quick Notes */}
        <div className="bg-sky-950/40 p-3 rounded-xl border border-sky-800/40 text-xs text-sky-200 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>প্যাকেজ ও ম্যানুয়াল স্লট সাপোর্ট:</span>
          </div>
          <p className="text-[11px] text-slate-300">
            বিকাশ বা নগদ পেমেন্ট করার পর এআই অটোমেটিক ভেরিফাই করতে কোনো সময় সমস্যা হলে ট্রানজেকশন স্ক্রিনশট সহ এডমিনকে টেলিগ্রামে পাঠান, এডমিন ম্যানুয়ালি স্লট এক্টিভ করে দেবেন।
          </p>
        </div>

      </div>
    </div>
  );
};
