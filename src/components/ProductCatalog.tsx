import React, { useState } from 'react';
import { Product, Language } from '../types';
import { Search, Copy, Check, Calculator, ShoppingCart, Sparkles, Filter, Tag, Layers, Share2 } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  lang: Language;
  onOpenCalculator: (product: Product) => void;
  onOpenOrder: (product: Product, sellingPrice: number) => void;
  productCount: number;
  productLimit: number;
  onUpgradeClick: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  lang,
  onOpenCalculator,
  onOpenOrder,
  productCount,
  productLimit,
  onUpgradeClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Store custom selected selling price per product ID
  const [sellingPrices, setSellingPrices] = useState<Record<string, number>>(() => {
    const initialMap: Record<string, number> = {};
    products.forEach((p) => {
      initialMap[p.id] = Math.round((p.minSellingPrice + p.maxSellingPrice) / 2);
    });
    return initialMap;
  });

  const categories = [
    { bn: 'সকল পণ্য', en: 'All', value: 'All' },
    { bn: 'ইলেকট্রনিক্স', en: 'Electronics', value: 'Electronics' },
    { bn: 'গ্যাজেট', en: 'Gadgets', value: 'Gadgets' },
    { bn: 'ফ্যাশন ও পোষাক', en: 'Fashion', value: 'Fashion' },
    { bn: 'খাদ্য ও গ্রোসারী', en: 'Food & Grocery', value: 'Food & Grocery' },
    { bn: 'হোম অ্যাপ্লায়েন্স', en: 'Home Appliance', value: 'Home Appliance' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || product.categoryEn === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handlePriceChange = (productId: string, val: number) => {
    setSellingPrices((prev) => ({ ...prev, [productId]: val }));
  };

  const handleCopyContent = (product: Product, price: number) => {
    const textToCopy = `🔥 ${product.nameBn} 🔥
📌 পাইকারি ও রিটেল সেরা গ্যাজেট
💰 অফার প্রাইজ: ৳${price}
🚚 সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা!

অর্ডার করতে এখনই আমাদের ইনবক্স করুন বা মেসেজ দিন!`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isLimitReached = productLimit !== -1 && productCount >= productLimit;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Product Slot Capacity & Upgrade Callout */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 p-4 rounded-2xl border border-purple-800/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
              <span>{lang === 'bn' ? 'সেলার ক্যাটালগ ও প্রফিট মার্জিন' : 'Seller Wholesale Catalog'}</span>
              <span className="text-[10px] bg-purple-900 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/30">
                ৮০% প্রফিট শেয়ার
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'bn'
                ? `বর্তমান ব্যবহার: ${productCount} / ${productLimit === -1 ? 'আনলিমিটেড' : productLimit} টি স্লট। পাইকারি দামে বিক্রি করে লাভ রাখুন।`
                : `Used: ${productCount} / ${productLimit === -1 ? 'Unlimited' : productLimit} slots. Pick wholesale products to resell.`}
            </p>
          </div>
        </div>

        {isLimitReached ? (
          <button
            onClick={onUpgradeClick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all animate-pulse"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'bn' ? 'স্লট বাড়াতে প্যাকেজ কিনুন (৳৩০০-৳৫৯৯৯)' : 'Upgrade Package Slot'}</span>
          </button>
        ) : (
          <button
            onClick={onUpgradeClick}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-purple-900/50 border border-purple-600/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'প্যাকেজ প্ল্যান দেখুন' : 'View Packages'}</span>
          </button>
        )}
      </div>

      {/* Search & Category Filter Header */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
              }`}
            >
              {lang === 'bn' ? cat.bn : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const currentPrice = sellingPrices[product.id] || product.minSellingPrice;
          const wholesale = product.wholesalePrice;
          const totalProfit = Math.max(0, currentPrice - wholesale);
          const sellerProfit = Math.round(totalProfit * 0.8);
          const adminProfit = Math.round(totalProfit * 0.2);

          return (
            <div
              key={product.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-600/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-900/20 transition-all flex flex-col group"
            >
              {/* Product Image & Badges */}
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-purple-300 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-purple-500/30">
                  {lang === 'bn' ? product.categoryBn : product.categoryEn}
                </span>

                {/* Stock Badge */}
                <span className="absolute top-3 right-3 bg-emerald-950/80 text-emerald-300 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  স্টক: {product.stock}
                </span>

                {/* Wholesale Price Tag */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 text-xs">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">{lang === 'bn' ? 'পাইকারি দাম' : 'Wholesale'}</span>
                  <span className="font-extrabold text-amber-400 text-sm">৳{product.wholesalePrice}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Name & Description */}
                <div>
                  <h3 className="font-bold text-sm text-slate-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {lang === 'bn' ? product.nameBn : product.nameEn}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {lang === 'bn' ? product.descriptionBn : product.descriptionEn}
                  </p>
                </div>

                {/* Interactive Selling Price Slider Widget */}
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{lang === 'bn' ? 'বিক্রয়মূল্য নির্বাচন:' : 'Set Retail Price:'}</span>
                    <span className="font-bold text-purple-300 text-sm">৳{currentPrice}</span>
                  </div>

                  <input
                    type="range"
                    min={product.minSellingPrice}
                    max={product.maxSellingPrice}
                    step={25}
                    value={currentPrice}
                    onChange={(e) => handlePriceChange(product.id, Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>সীমা: ৳{product.minSellingPrice}</span>
                    <span>সর্বোচ্চ: ৳{product.maxSellingPrice}</span>
                  </div>

                  {/* Profit Share Live Counter */}
                  <div className="pt-1 border-t border-slate-700/50 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{lang === 'bn' ? 'আপনার লাভ (৮০%):' : 'Your Profit (80%):'}</span>
                    <span className="font-extrabold text-emerald-400 text-sm bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                      +৳{sellerProfit}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyContent(product, currentPrice)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      {copiedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-400" />
                          <span>{lang === 'bn' ? 'কপি কন্টেন্ট' : 'Copy Post'}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenCalculator(product)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Calculator className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'bn' ? 'ক্যালকুলেটর' : 'Calculate'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenOrder(product, currentPrice)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'অর্ডার এন্ট্রি করুন (লাভ ৳' + sellerProfit + ')' : `Place Order (Profit ৳${sellerProfit})`}</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
