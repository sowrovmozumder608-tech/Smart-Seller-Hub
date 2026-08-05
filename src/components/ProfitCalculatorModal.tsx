import React, { useState } from 'react';
import { Product, Language } from '../types';
import { X, Calculator, ArrowRight, DollarSign, Percent, CheckCircle2 } from 'lucide-react';

interface ProfitCalculatorModalProps {
  product: Product;
  lang: Language;
  onClose: () => void;
  onOrderNow: (product: Product, sellingPrice: number) => void;
}

export const ProfitCalculatorModal: React.FC<ProfitCalculatorModalProps> = ({
  product,
  lang,
  onClose,
  onOrderNow,
}) => {
  const [sellingPrice, setSellingPrice] = useState<number>(
    Math.round((product.minSellingPrice + product.maxSellingPrice) / 2)
  );

  const wholesale = product.wholesalePrice;
  const totalProfit = Math.max(0, sellingPrice - wholesale);
  const sellerShare = Math.round(totalProfit * 0.8); // 80% to Reseller
  const adminShare = Math.round(totalProfit * 0.2); // 20% to Platform/Admin

  const marginPercent = Math.round((totalProfit / sellingPrice) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-purple-800/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {lang === 'bn' ? '৮০% কমিশন সিমুলেটর ও প্রফিট ক্যালকুলেটর' : '80% Commission & Profit Calculator'}
            </h3>
            <p className="text-xs text-purple-300">
              {lang === 'bn' ? product.nameBn : product.nameEn}
            </p>
          </div>
        </div>

        {/* Product Summary Row */}
        <div className="flex items-center gap-4 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 mb-5">
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-16 h-16 rounded-lg object-cover border border-slate-700"
          />
          <div className="flex-1 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'পাইকারি রেট:' : 'Wholesale Price:'}</span>
              <span className="font-bold text-amber-400">৳{product.wholesalePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'অনুমোদিত রেঞ্জ:' : 'Min-Max Range:'}</span>
              <span className="font-semibold text-slate-200">৳{product.minSellingPrice} - ৳{product.maxSellingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'স্টক:' : 'Stock Available:'}</span>
              <span className="text-emerald-400 font-semibold">{product.stock} pcs</span>
            </div>
          </div>
        </div>

        {/* Selling Price Adjustment Slider & Input */}
        <div className="space-y-4 mb-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">
              {lang === 'bn' ? 'আপনার নির্ধারিত বিক্রয়মূল্য (টাকায়):' : 'Your Chosen Selling Price (BDT):'}
            </label>
            <div className="flex items-center bg-slate-900 border border-purple-500/50 rounded-lg px-3 py-1">
              <span className="text-purple-400 font-bold mr-1">৳</span>
              <input
                type="number"
                min={product.minSellingPrice}
                max={product.maxSellingPrice}
                value={sellingPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSellingPrice(val);
                }}
                className="w-24 bg-transparent text-right font-bold text-purple-300 focus:outline-none text-sm"
              />
            </div>
          </div>

          <input
            type="range"
            min={product.minSellingPrice}
            max={product.maxSellingPrice}
            step={50}
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>সর্বনিম্ন: ৳{product.minSellingPrice}</span>
            <span className="text-purple-400 font-medium">{marginPercent}% প্রফিট মার্জিন</span>
            <span>সর্বোচ্চ: ৳{product.maxSellingPrice}</span>
          </div>
        </div>

        {/* Profit Split Breakdown Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-center relative overflow-hidden">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1">
              {lang === 'bn' ? 'আপনার কমিশন (৮০%)' : 'Your Profit (80%)'}
            </div>
            <div className="text-2xl font-black text-emerald-300">
              ৳{sellerShare}
            </div>
            <p className="text-[10px] text-emerald-400/80 mt-1">
              {lang === 'bn' ? 'সরাসরি আপনার ওয়ালেটে জমা' : 'Added to reseller balance'}
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
              {lang === 'bn' ? 'এডমিন কমিশন (২০%)' : 'Admin Share (20%)'}
            </div>
            <div className="text-xl font-bold text-slate-300">
              ৳{adminShare}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {lang === 'bn' ? 'প্ল্যাটফর্ম ও সার্ভিস চার্জ' : 'Platform & service fee'}
            </p>
          </div>
        </div>

        {/* 10 Items Monthly Projection Calculation */}
        <div className="bg-purple-950/30 border border-purple-800/40 p-3 rounded-xl mb-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200">
              {lang === 'bn' ? 'প্রতি মাসে ১০ টি এই পণ্য বিক্রি করলে আয়:' : 'Earn from 10 sales/month:'}
            </span>
          </div>
          <span className="font-extrabold text-amber-300 text-sm">
            ৳{sellerShare * 10}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
          
          <button
            onClick={() => {
              onClose();
              onOrderNow(product, sellingPrice);
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>{lang === 'bn' ? 'এই রেটে অর্ডার শুরু' : 'Place Order Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
