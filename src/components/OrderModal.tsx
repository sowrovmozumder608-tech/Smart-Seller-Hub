import React, { useState } from 'react';
import { Product, Language, Order } from '../types';
import { X, ShoppingBag, CheckCircle, User, Phone, MapPin, DollarSign } from 'lucide-react';

interface OrderModalProps {
  product: Product;
  initialSellingPrice: number;
  lang: Language;
  onClose: () => void;
  onSubmitOrder: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  initialSellingPrice,
  lang,
  onClose,
  onSubmitOrder,
}) => {
  const [sellingPrice, setSellingPrice] = useState<number>(initialSellingPrice);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'COD' | 'Paid' | 'Pending'>('COD');
  const [isSuccess, setIsSuccess] = useState(false);

  const wholesale = product.wholesalePrice;
  const totalProfit = Math.max(0, sellingPrice - wholesale);
  const sellerCommission = Math.round(totalProfit * 0.8);
  const adminCommission = Math.round(totalProfit * 0.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে কাস্টমারের নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন।' : 'Please fill out all customer details.');
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: product.id,
      productNameBn: product.nameBn,
      sellerId: 'user-101',
      customerName,
      customerPhone,
      customerAddress,
      wholesalePrice: product.wholesalePrice,
      sellingPrice,
      totalProfit,
      sellerCommission,
      adminCommission,
      paymentStatus,
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onSubmitOrder(newOrder);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

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

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-emerald-300">
              {lang === 'bn' ? 'অর্ডার সফলভাবে সাবমিট হয়েছে!' : 'Order Placed Successfully!'}
            </h3>
            <p className="text-xs text-slate-300">
              {lang === 'bn'
                ? `আপনার ৮০% কমিশন ৳${sellerCommission} প্রসেসিংয়ে জমা হয়েছে।`
                : `Your 80% commission ৳${sellerCommission} is recorded.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  {lang === 'bn' ? 'কাস্টমার অর্ডার এন্ট্রি ফর্ম' : 'Create Customer Order'}
                </h3>
                <p className="text-xs text-purple-300">
                  {lang === 'bn' ? product.nameBn : product.nameEn}
                </p>
              </div>
            </div>

            {/* Price & Commission Live Summary Box */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">{lang === 'bn' ? 'বিক্রয়মূল্য:' : 'Selling Price:'}</span>
                <span className="text-sm font-bold text-purple-300">৳{sellingPrice}</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 block font-semibold">{lang === 'bn' ? 'আপনার ৮০% লাভ:' : 'Your 80% Commission:'}</span>
                <span className="text-base font-extrabold text-emerald-300">৳{sellerCommission}</span>
              </div>
            </div>

            {/* Price Slider adjustment inside form */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400 flex justify-between">
                <span>{lang === 'bn' ? 'বিক্রি দাম মানানসই করুন:' : 'Adjust Selling Price:'}</span>
                <span className="text-slate-200">৳{sellingPrice} (সীমা: ৳{product.minSellingPrice}-৳{product.maxSellingPrice})</span>
              </label>
              <input
                type="range"
                min={product.minSellingPrice}
                max={product.maxSellingPrice}
                step={50}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'bn' ? 'কাস্টমারের নাম:' : 'Customer Name:'}</span>
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ রহিম' : 'e.g. Rahim Ahmed'}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Customer Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'bn' ? 'কাস্টমারের ফোন নাম্বার:' : 'Customer Phone:'}</span>
              </label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Customer Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা:' : 'Full Delivery Address:'}</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder={lang === 'bn' ? 'বাসা নম্বর, রোড, থানা, জেলা...' : 'House, Road, Area, Thana, District...'}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'পেমেন্ট টাইপ:' : 'Payment Type:'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentStatus('COD')}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                    paymentStatus === 'COD'
                      ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash On Delivery'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentStatus('Paid')}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                    paymentStatus === 'Paid'
                      ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? 'অগ্রিম পেইড' : 'Advance Paid'}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                {lang === 'bn' ? 'অর্ডার সাবমিট করুন' : 'Confirm Order'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
