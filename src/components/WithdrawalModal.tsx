import React, { useState } from 'react';
import { Language } from '../types';
import { X, Wallet, CheckCircle, AlertCircle } from 'lucide-react';

interface WithdrawalModalProps {
  balance: number;
  lang: Language;
  onClose: () => void;
  onWithdrawSuccess: (amount: number) => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  balance,
  lang,
  onClose,
  onWithdrawSuccess,
}) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [phone, setPhone] = useState('01712345678');
  const [amount, setAmount] = useState<number>(balance || 500);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > balance) {
      alert('আপনার পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }
    if (amount < 300) {
      alert('সর্বনিম্ন উইথড্র অ্যামাউন্ট ৳৩০০!');
      return;
    }

    onWithdrawSuccess(amount);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-800/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-emerald-300">
              {lang === 'bn' ? 'উইথড্র রিকোয়েস্ট সফল হয়েছে!' : 'Withdrawal Request Submitted!'}
            </h3>
            <p className="text-xs text-slate-300">
              {lang === 'bn' ? `৳${amount} আপনার ${method} নম্বরে ২৪ ঘণ্টার মধ্যে পাঠানো হবে।` : `৳${amount} will be sent to your wallet.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {lang === 'bn' ? '৮০% কমিশন ব্যালেন্স উইথড্র' : 'Withdraw Earnings'}
                </h3>
                <p className="text-xs text-amber-300">
                  {lang === 'bn' ? `বর্তমান জমানো ব্যালেন্স: ৳${balance}` : `Available Balance: ৳${balance}`}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Wallet:'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMethod('bKash')}
                  className={`py-2 rounded-xl border text-center transition-all ${
                    method === 'bKash' ? 'bg-pink-900/60 border-pink-500 text-pink-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('Nagad')}
                  className={`py-2 rounded-xl border text-center transition-all ${
                    method === 'Nagad' ? 'bg-orange-900/60 border-orange-500 text-orange-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Nagad
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'ওয়ালেট মোবাইল নম্বর:' : 'Wallet Number:'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'উইথড্র টাকা পরিমাণ (৳):' : 'Withdraw Amount (BDT):'}
              </label>
              <input
                type="number"
                required
                min={300}
                max={balance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
            >
              {lang === 'bn' ? 'উইথড্র নিশ্চিত করুন' : 'Confirm Withdrawal'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
