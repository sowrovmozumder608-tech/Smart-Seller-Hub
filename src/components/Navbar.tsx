import React from 'react';
import { UserRole, Language, PackageTierId } from '../types';
import { ShoppingBag, ShieldCheck, UserCheck, Sparkles, PhoneCall, HelpCircle, Layers, MessageSquare, Send } from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  userTier: PackageTierId;
  productCount: number;
  productLimit: number;
  balance: number;
  onOpenPackages: () => void;
  onOpenTelegram: () => void;
  onOpenAIChat: () => void;
  activeTab: 'catalog' | 'dashboard' | 'packages' | 'admin' | 'ai-chat';
  setActiveTab: (tab: 'catalog' | 'dashboard' | 'packages' | 'admin' | 'ai-chat') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  lang,
  setLang,
  userTier,
  productCount,
  productLimit,
  balance,
  onOpenPackages,
  onOpenTelegram,
  onOpenAIChat,
  activeTab,
  setActiveTab,
}) => {
  const getTierBadge = () => {
    switch (userTier) {
      case 'vip':
        return { nameBn: 'ভিআইপি', nameEn: 'VIP', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'golden':
        return { nameBn: 'গোল্ডেন', nameEn: 'Golden', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'platinum':
        return { nameBn: 'প্লাটিনাম', nameEn: 'Platinum', class: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      case 'premium':
        return { nameBn: 'প্রিমিয়াম', nameEn: 'Premium', class: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      default:
        return { nameBn: 'ফ্রি প্ল্যান', nameEn: 'Free Plan', class: 'bg-slate-700/50 text-slate-300 border-slate-600' };
    }
  };

  const badge = getTierBadge();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-purple-900/40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 border border-purple-400/30">
              <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200">
                  পণ্যসেতু
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-500/30">
                  Smart Seller Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {lang === 'bn' ? 'অল-ইন-ওয়ান পাইকারি ও রিসেলার প্ল্যাটফর্ম' : 'All-in-One Wholesale & Reseller Network'}
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {lang === 'bn' ? 'পণ্য ক্যাটালগ' : 'Products'}
            </button>

            {role === 'seller' && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {lang === 'bn' ? 'রিসেলার ড্যাশবোর্ড' : 'Seller Dashboard'}
              </button>
            )}

            <button
              onClick={() => setActiveTab('packages')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'packages'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-amber-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'প্যাকেজ প্ল্যান (৳৩০০-৳৫৯৯৯)' : 'Packages'}
            </button>

            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-chat'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-indigo-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'এআই হেল্পার' : 'AI Assistant'}
            </button>

            {role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-emerald-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}
              </button>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Telegram Support Channel Link */}
            <a
              href="https://t.me/SmartSeller1199"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Join Telegram Channel: https://t.me/SmartSeller1199"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">টেলিগ্রাম চ্যানেল</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 font-semibold transition-all"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>

            {/* Active Tier Badge & Slot Info */}
            <div
              onClick={onOpenPackages}
              className={`cursor-pointer px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-transform hover:scale-105 ${badge.class}`}
            >
              <span>{lang === 'bn' ? badge.nameBn : badge.nameEn}</span>
              <span className="text-[10px] opacity-75 hidden lg:inline">
                ({productCount}/{productLimit === -1 ? '∞' : productLimit})
              </span>
            </div>

            {/* Role Switcher Toggle */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/70 flex items-center gap-1">
              <button
                onClick={() => {
                  setRole('seller');
                  if (activeTab === 'admin') setActiveTab('catalog');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  role === 'seller'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'রিসেলার' : 'Seller'}</span>
              </button>

              <button
                onClick={() => {
                  setRole('admin');
                  setActiveTab('admin');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  role === 'admin'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-purple-900/40 py-2 px-3 z-50 flex items-center justify-around text-slate-400">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeTab === 'catalog' ? 'text-purple-400 font-bold' : ''
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>ক্যাটালগ</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeTab === 'dashboard' ? 'text-purple-400 font-bold' : ''
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>ড্যাশবোর্ড</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeTab === 'packages' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>প্যাকেজ</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-chat')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeTab === 'ai-chat' ? 'text-indigo-400 font-bold' : ''
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>এআই হেল্পার</span>
        </button>

        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${
              activeTab === 'admin' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>এডমিন</span>
          </button>
        )}
      </div>
    </header>
  );
};
