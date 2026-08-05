import React, { useState } from 'react';
import { Product, PaymentTransaction, JobTask, Language, Order } from '../types';
import { ShieldCheck, Plus, Trash2, Edit3, CheckCircle2, XCircle, Sparkles, DollarSign, Users, TrendingUp, Package, AlertCircle } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  transactions: PaymentTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<PaymentTransaction[]>>;
  jobs: JobTask[];
  setJobs: React.Dispatch<React.SetStateAction<JobTask[]>>;
  orders: Order[];
  lang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  setProducts,
  transactions,
  setTransactions,
  jobs,
  setJobs,
  orders,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'payments' | 'jobs' | 'analytics'>('products');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryBn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered Transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      t.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userPhone.includes(searchTerm)
  );

  // New Product Form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [nameBn, setNameBn] = useState('');
  const [categoryBn, setCategoryBn] = useState('গ্যাজেট');
  const [wholesalePrice, setWholesalePrice] = useState<number>(1000);
  const [minSellingPrice, setMinSellingPrice] = useState<number>(1200);
  const [maxSellingPrice, setMaxSellingPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(50);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80');
  const [descriptionBn, setDescriptionBn] = useState('');

  // New Job Form State
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobTitleBn, setJobTitleBn] = useState('');
  const [jobRewardBn, setJobRewardBn] = useState('৳১০০ স্পেশাল বোনাস');
  const [jobDescBn, setJobDescBn] = useState('');

  // Add Product Handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      nameBn,
      nameEn: nameBn,
      categoryBn,
      categoryEn: categoryBn === 'ইলেকট্রনিক্স' ? 'Electronics' : 'Gadgets',
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      descriptionBn,
      descriptionEn: descriptionBn,
      wholesalePrice,
      minSellingPrice,
      maxSellingPrice,
      stock,
      totalSold: 0,
    };

    setProducts([newProd, ...products]);
    setShowAddProduct(false);
    alert('নতুন পাইকারি পণ্য ক্যাটালগে যুক্ত হয়েছে!');
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm('আপনি কি সত্যিই এই পণ্যটি মুছে ফেলতে চান?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Approve Payment Transaction Slot
  const handleApproveTx = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'Admin_Approved' } : t))
    );
    alert('পেমেন্ট অনুমোদিত হয়েছে এবং রিসেলারের প্যাকেজ প্রোডাক্ট স্লট চালু হয়েছে!');
  };

  // Reject Payment Transaction Slot
  const handleRejectTx = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'Rejected' } : t))
    );
  };

  // Add Job Handler
  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobTask = {
      id: `JOB-${Date.now()}`,
      titleBn: jobTitleBn,
      titleEn: jobTitleBn,
      rewardBn: jobRewardBn,
      rewardEn: jobRewardBn,
      descriptionBn: jobDescBn,
      descriptionEn: jobDescBn,
      deadline: '২০২৬-০৮-২০',
      status: 'Active',
    };
    setJobs([newJob, ...jobs]);
    setShowAddJob(false);
  };

  // Analytics Calculations
  const totalSalesVolume = orders.reduce((acc, curr) => acc + curr.sellingPrice, 0);
  const totalAdminEarnings = orders.reduce((acc, curr) => acc + curr.adminCommission, 0);
  const totalResellerEarnings = orders.reduce((acc, curr) => acc + curr.sellerCommission, 0);

  return (
    <div className="space-y-8">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-4 sm:p-6 rounded-2xl border border-emerald-800/50 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-100 flex items-center gap-2 flex-wrap">
                <span>{lang === 'bn' ? 'অ্যাডমিন কন্ট্রোল প্যানেল' : 'Admin Control Hub'}</span>
                <span className="text-[10px] sm:text-xs bg-emerald-900 text-emerald-200 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  মোবাইল ফ্রেন্ডলি
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                {lang === 'bn'
                  ? 'পণ্য সংযোগ, পাইকারি মূল্য সেটিং, বিকাশ/নগদ পেমেন্ট ভেরিফিকেশন ও এআই রিপোটিং।'
                  : 'Manage wholesale inventory, bKash/Nagad AI verification & sales reports.'}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Mobile-Friendly Tab Navigation */}
        <div className="overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/80 min-w-max">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeTab === 'products' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>পণ্য ব্যবস্থাপনা</span>
              <span className="ml-1 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-emerald-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeTab === 'payments' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>পেমেন্ট ভেরিফিকেশন</span>
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                {transactions.filter((t) => t.status === 'Pending' || t.status === 'AI_Approved').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeTab === 'jobs' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>জবস ও টাস্ক</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeTab === 'analytics' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>রিপোর্ট ও গ্রাফ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <span className="text-[11px] font-semibold text-slate-400 block">{lang === 'bn' ? 'মোট প্ল্যাটফর্ম সেলস' : 'Total Sales Volume'}</span>
          <span className="text-2xl font-extrabold text-slate-100">৳{totalSalesVolume}</span>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 shadow-xl">
          <span className="text-[11px] font-semibold text-emerald-400 block">{lang === 'bn' ? 'এডমিন ২০% প্রফিট রিভিনিউ' : 'Admin 20% Earnings'}</span>
          <span className="text-2xl font-extrabold text-emerald-300">৳{totalAdminEarnings}</span>
        </div>

        <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-4 shadow-xl">
          <span className="text-[11px] font-semibold text-purple-400 block">{lang === 'bn' ? 'রিসেলারদের প্রদানকৃত ৮০% লাভ' : 'Reseller 80% Payout'}</span>
          <span className="text-2xl font-extrabold text-purple-300">৳{totalResellerEarnings}</span>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 shadow-xl">
          <span className="text-[11px] font-semibold text-amber-400 block">{lang === 'bn' ? 'মোট প্রোডাক্ট ক্যাটালগ' : 'Total Products'}</span>
          <span className="text-2xl font-extrabold text-amber-300">{products.length} টি</span>
        </div>
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          
          {/* Header & Mobile Add Button & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{lang === 'bn' ? 'পাইকারি পণ্য ক্যাটালগ তালিকা' : 'Wholesale Product Inventory'}</span>
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="খুঁজুন (নাম বা ক্যাটাগরি)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-48 min-h-[40px]"
              />

              <button
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all shrink-0 min-h-[40px]"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'পণ্য যোগ' : 'Add Product'}</span>
              </button>
            </div>
          </div>

          {/* Add Product Modal Form */}
          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="bg-slate-900 border border-emerald-500/50 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="font-bold text-sm sm:text-base text-emerald-300">
                  নতুন পণ্য এন্ট্রি ফর্ম
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                >
                  বন্ধ করুন
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">পণ্যের নাম (বাংলা):</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ওয়্যারলেস ফাস্ট চার্জার"
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">ক্যাটাগরি:</label>
                  <select
                    value={categoryBn}
                    onChange={(e) => setCategoryBn(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  >
                    <option value="গ্যাজেট">গ্যাজেট</option>
                    <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
                    <option value="ফ্যাশন ও পোষাক">ফ্যাশন ও পোষাক</option>
                    <option value="খাদ্য ও গ্রোসারী">খাদ্য ও গ্রোসারী</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-400 mb-1">পাইকারি মূল্য (৳):</label>
                  <input
                    type="number"
                    required
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">সর্বনিম্ন বিক্রয়মূল্য (৳):</label>
                  <input
                    type="number"
                    required
                    value={minSellingPrice}
                    onChange={(e) => setMinSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">সর্বোচ্চ বিক্রয়মূল্য (৳):</label>
                  <input
                    type="number"
                    required
                    value={maxSellingPrice}
                    onChange={(e) => setMaxSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">স্টক সংখ্যা:</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ছবি URL:</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ:</label>
                <textarea
                  rows={2}
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

          {/* Product View - Mobile Cards (< sm) & Desktop Table (>= sm) */}
          
          {/* Mobile Card List */}
          <div className="grid grid-cols-1 gap-3.5 sm:hidden">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3"
              >
                <img
                  src={prod.image}
                  alt={prod.nameBn}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                    {prod.categoryBn}
                  </span>
                  <h4 className="font-bold text-xs text-slate-100 truncate">{prod.nameBn}</h4>
                  
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-amber-400 font-extrabold">পাইকারি: ৳{prod.wholesalePrice}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-400 font-semibold">{prod.stock} stock</span>
                  </div>

                  <p className="text-[10px] text-slate-400">
                    রিটেল রেঞ্জ: ৳{prod.minSellingPrice} - ৳{prod.maxSellingPrice}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 shrink-0"
                  title="ডিলিট করুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">ছবি ও নাম</th>
                  <th className="p-3">পাইকারি দাম</th>
                  <th className="p-3">বিক্রয় রেঞ্জ (Min-Max)</th>
                  <th className="p-3">স্টক</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img src={prod.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                      <div>
                        <span className="font-bold text-slate-200 block">{prod.nameBn}</span>
                        <span className="text-[10px] text-purple-400">{prod.categoryBn}</span>
                      </div>
                    </td>
                    <td className="p-3 font-extrabold text-amber-400">৳{prod.wholesalePrice}</td>
                    <td className="p-3 font-medium text-slate-300">৳{prod.minSellingPrice} - ৳{prod.maxSellingPrice}</td>
                    <td className="p-3 text-emerald-400 font-semibold">{prod.stock} pcs</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AI PAYMENT VERIFICATION */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>bKash/Nagad পেমেন্ট ও এআই ভেরিফিকেশন (01924876491)</span>
            </h3>

            <input
              type="text"
              placeholder="TxID, সেলার নাম বা মোবাইল নম্বর..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 w-full sm:w-64 min-h-[40px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                      {tx.transactionId}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-pink-900/60 text-pink-300 border border-pink-500/30">
                      {tx.method} (৳{tx.amount})
                    </span>
                    <span className="text-xs text-purple-300 font-semibold bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30">
                      {tx.packageName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    রিসেলার: <span className="font-bold text-slate-100">{tx.userName}</span> ({tx.userPhone})
                  </p>

                  {/* AI Confidence Reasoning */}
                  {tx.aiReasoning && (
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-purple-800/40 text-xs text-purple-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 block">এআই ভেরিফায়ার রিপোর্ট:</span>
                        <span>{tx.aiReasoning}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status or Approval Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {tx.status === 'Admin_Approved' ? (
                    <span className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[42px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>অনুমোদিত ও স্লট এক্টিভ</span>
                    </span>
                  ) : tx.status === 'Rejected' ? (
                    <span className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-red-950 text-red-300 border border-red-500/40 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[42px]">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>বাতিলকৃত</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleRejectTx(tx.id)}
                        className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 text-xs font-bold transition-all min-h-[42px]"
                      >
                        বাতিল
                      </button>
                      
                      <button
                        onClick={() => handleApproveTx(tx.id)}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all min-h-[42px]"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>অনুমোদন করুন</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: JOBS & TASKS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>রিসেলারদের জন্য স্পেশাল বোনাস টাস্ক পোস্ট করুন</span>
            </h3>

            <button
              onClick={() => setShowAddJob(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন টাস্ক পোস্ট</span>
            </button>
          </div>

          {showAddJob && (
            <form onSubmit={handleAddJob} className="bg-slate-900 border border-purple-500/50 p-5 rounded-2xl space-y-3 max-w-xl">
              <h4 className="font-bold text-sm text-purple-300">টাস্ক এন্ট্রি ফর্ম</h4>
              <input
                type="text"
                placeholder="টাস্ক এর শিরোনাম (যেমন: গ্রুপে শেয়ার করুন)"
                required
                value={jobTitleBn}
                onChange={(e) => setJobTitleBn(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <input
                type="text"
                placeholder="বোনাস রিওয়ার্ড (যেমন: ৳১০০ বোনাস)"
                required
                value={jobRewardBn}
                onChange={(e) => setJobRewardBn(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <textarea
                placeholder="বিস্তারিত নির্দেশিকা..."
                rows={2}
                value={jobDescBn}
                onChange={(e) => setJobDescBn(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddJob(false)} className="flex-1 py-1.5 text-xs bg-slate-800 rounded-xl">বাতিল</button>
                <button type="submit" className="flex-1 py-1.5 text-xs bg-purple-600 rounded-xl font-bold">পাবলিশ করুন</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((j) => (
              <div key={j.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">{j.rewardBn}</span>
                <h4 className="font-bold text-sm text-slate-100">{j.titleBn}</h4>
                <p className="text-xs text-slate-400">{j.descriptionBn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <h3 className="font-bold text-base text-slate-100">প্ল্যাটফর্ম সেলস ও কমিশন পারফরম্যান্স গ্রাফ</h3>
          
          <div className="h-48 bg-slate-800/60 rounded-xl border border-slate-700 p-4 flex items-end justify-between gap-2">
            {[45, 65, 80, 95, 120, 150, 210].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md transition-all duration-500 hover:brightness-125"
                  style={{ height: `${(val / 220) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400">Day {idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">গড় সেলস টিকেট:</span>
              <span className="font-extrabold text-amber-300 text-sm">৳১,৮৫০</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">সক্রিয় সেলার সংখ্যা:</span>
              <span className="font-extrabold text-purple-300 text-sm">১২৮ জন</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">সফল ডেলিভারি রেট:</span>
              <span className="font-extrabold text-emerald-300 text-sm">৯৪%</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
