import React, { useState } from 'react';
import { PackageTier, Language, PaymentTransaction, PackageTierId } from '../types';
import { PACKAGE_TIERS } from '../data/initialData';
import { Sparkles, CheckCircle2, ShieldCheck, Copy, Check, ArrowRight, Wallet, QrCode, Zap, AlertCircle } from 'lucide-react';

interface PackageUpgradeProps {
  currentTier: PackageTierId;
  lang: Language;
  onUpgradeSuccess: (newTier: PackageTierId, tx: PaymentTransaction) => void;
}

export const PackageUpgrade: React.FC<PackageUpgradeProps> = ({
  currentTier,
  lang,
  onUpgradeSuccess,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>(PACKAGE_TIERS[1]); // Premium by default
  const [method, setMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [transactionId, setTransactionId] = useState('');
  const [userName, setUserName] = useState('আব্দুর রহমান');
  const [userPhone, setUserPhone] = useState('01712345678');
  
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{
    status: string;
    aiConfidence: number;
    aiReasoning: string;
  } | null>(null);

  const targetNumber = '01924876491';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(targetNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে পেমেন্ট ট্রানজেকশন আইডি (TxID) প্রদান করুন।' : 'Please enter Transaction ID.');
      return;
    }

    setIsLoading(true);
    setVerifyResult(null);

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          targetNumber,
          transactionId,
          amount: selectedPackage.price,
          packageName: selectedPackage.nameBn,
          userName,
          userPhone,
        }),
      });

      const data = await response.json();
      setVerifyResult(data);

      const newTx: PaymentTransaction = {
        id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
        userId: 'user-101',
        userName,
        userPhone,
        packageId: selectedPackage.id,
        packageName: selectedPackage.nameBn,
        amount: selectedPackage.price,
        method,
        targetNumber,
        transactionId,
        status: data.status === 'AI_Approved' ? 'AI_Approved' : 'Pending',
        aiConfidence: data.aiConfidence,
        aiReasoning: data.aiReasoning,
        submittedAt: new Date().toISOString(),
      };

      if (data.status === 'AI_Approved') {
        setTimeout(() => {
          onUpgradeSuccess(selectedPackage.id, newTx);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      alert('পেমেন্ট ভেরিফিকেশনে ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {lang === 'bn' ? 'স্মার্ট এআই অটো স্লট মেম্বারশিপ' : 'Smart AI Auto Package Activation'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200">
          {lang === 'bn' ? 'পণ্যসেতু প্যাকেজ প্ল্যান বেছে নিন' : 'Choose Your Reseller Package'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          {lang === 'bn'
            ? 'বিকাশ/নগদ নাম্বারে (01924876491) টাকা পাঠিয়ে এআই এর মাধ্যমে নিমিষেই আপনার পছন্দমতো প্রোডাক্ট স্লট আনলক করুন।'
            : 'Send money to bKash/Nagad 01924876491 and unlock product slots automatically with Gemini AI verification.'}
        </p>
      </div>

      {/* Package Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PACKAGE_TIERS.filter((p) => p.id !== 'free').map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          const isCurrent = currentTier === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`relative bg-slate-900/90 rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-2xl shadow-purple-900/40 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-lg">
                  {lang === 'bn' ? 'সবচেয়ে জনপ্রিয়' : 'Most Popular'}
                </span>
              )}

              {/* Current Active Badge */}
              {isCurrent && (
                <span className="absolute top-3 right-3 bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-extrabold px-2 py-0.5 rounded-md">
                  {lang === 'bn' ? 'সক্রিয়' : 'Active'}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span>{lang === 'bn' ? pkg.nameBn : pkg.nameEn}</span>
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-amber-400">৳{pkg.price}</span>
                    <span className="text-xs text-slate-400">/ এককালীন</span>
                  </div>
                  <p className="text-xs font-semibold text-purple-300 mt-1">
                    {pkg.productLimit === -1
                      ? (lang === 'bn' ? 'আনলিমিটেড পণ্য স্লট' : 'Unlimited Product Slots')
                      : `${pkg.productLimit} টি পণ্য স্লট`}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  {(lang === 'bn' ? pkg.featuresBn : pkg.featuresEn).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Button */}
              <div className="mt-6 pt-3">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isSelected
                    ? (lang === 'bn' ? 'প্যাকেজ নির্বাচিত' : 'Selected')
                    : (lang === 'bn' ? 'নির্বাচন করুন' : 'Select Plan')}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Payment Gateway Submission Card */}
      <div className="bg-slate-900 border border-purple-800/50 rounded-2xl p-6 shadow-2xl max-w-3xl mx-auto space-y-6">
        
        {/* Step Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {lang === 'bn'
                  ? `পেমেন্ট সম্পন্ন করুন: ${selectedPackage.nameBn} (৳${selectedPackage.price})`
                  : `Complete Payment: ${selectedPackage.nameEn} (৳${selectedPackage.price})`}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'নিচের নাম্বারে টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন।' : 'Send money & enter Transaction ID below.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
            ৳{selectedPackage.price}
          </span>
        </div>

        {/* Official Number Copy Box */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold text-xs">
              bKash / Nagad (সেন্ড মানি)
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">{lang === 'bn' ? 'অফিসিয়াল বিকাশ/নগদ সেন্ড মানি নাম্বার:' : 'Official bKash/Nagad Send Money Number:'}</span>
              <span className="text-lg font-mono font-extrabold text-amber-300 tracking-wider">
                {targetNumber}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyNumber}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {copiedNumber ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'bn' ? 'নাম্বার কপি হয়েছে!' : 'Copied Number!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নাম্বার কপি করুন' : 'Copy Number'}</span>
              </>
            )}
          </button>
        </div>

        {/* Send Money Important Note Banner */}
        <div className="bg-pink-950/40 border border-pink-500/30 p-3 rounded-xl flex items-center gap-2.5 text-xs text-pink-200">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'বিশেষ দ্রষ্টব্য: সব ধরণের টাকা বিকাশ অথবা নগদ পার্সোনাল নাম্বারে (01924876491) "সেন্ড মানি" (Send Money) করতে হবে।'
              : 'Important: All payments must be sent via "Send Money" to bKash/Nagad personal number 01924876491.'}
          </span>
        </div>

        {/* AI Auto Verification Form */}
        <form onSubmit={handleVerifyPayment} className="space-y-4">
          
          {/* Method Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {lang === 'bn' ? 'পেমেন্ট মাধ্যম বেছে নিন:' : 'Select Payment Gateway:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('bKash')}
                className={`py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  method === 'bKash'
                    ? 'bg-pink-900/60 border-pink-500 text-pink-200 ring-2 ring-pink-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <span>bKash (বিকাশ)</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('Nagad')}
                className={`py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  method === 'Nagad'
                    ? 'bg-orange-900/60 border-orange-500 text-orange-200 ring-2 ring-orange-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <span>Nagad (নগদ)</span>
              </button>
            </div>
          </div>

          {/* User Details Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'আপনার নাম:' : 'Your Name:'}
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'আপনার মোবাইল নাম্বার:' : 'Your Phone Number:'}
              </label>
              <input
                type="tel"
                required
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Transaction ID Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>{lang === 'bn' ? 'পেমেন্ট ট্রানজেকশন আইডি (TxID):' : 'Transaction ID (TxID):'}</span>
              <span className="text-[10px] text-purple-400 font-mono">যেমন: 8M7X9K2P1L</span>
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'bn' ? 'পেমেন্ট মেসেজ থেকে ১০ সংখ্যার TxID দিন...' : 'Enter 10-digit TxID...'}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
              className="w-full bg-slate-800 border border-purple-500/50 rounded-xl px-4 py-2.5 font-mono text-sm tracking-widest text-amber-300 placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-purple-200">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'bn' ? 'এআই ট্রানজেকশন যাচাই করছে...' : 'Gemini AI Verifying TxID...'}</span>
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300" />
                <span>
                  {lang === 'bn'
                    ? `এআই ভেরিফাই ও ${selectedPackage.nameBn} আনলক করুন`
                    : `Verify with AI & Unlock ${selectedPackage.nameEn}`}
                </span>
              </>
            )}
          </button>

        </form>

        {/* AI Result Alert Notification */}
        {verifyResult && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 ${
              verifyResult.status === 'AI_Approved'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {verifyResult.status === 'AI_Approved'
                    ? (lang === 'bn' ? 'এআই অটো পেমেন্ট সফলভাবে অনুমোদিত!' : 'AI Auto Payment Verified!')
                    : (lang === 'bn' ? 'ম্যানুয়াল এডমিন রিভিউর জন্য সংরক্ষিত' : 'Sent for Admin Review')}
                </span>
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px]">
                AI স্কোর: {Math.round(verifyResult.aiConfidence * 100)}%
              </span>
            </div>
            <p className="text-slate-300">
              {verifyResult.aiReasoning}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
