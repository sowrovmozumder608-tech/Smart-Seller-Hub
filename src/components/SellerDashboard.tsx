import React from 'react';
import { Order, JobTask, Language, PackageTierId } from '../types';
import { DollarSign, ShoppingBag, Layers, Award, ArrowUpRight, Clock, CheckCircle2, AlertTriangle, Sparkles, Send, Wallet } from 'lucide-react';

interface SellerDashboardProps {
  orders: Order[];
  jobs: JobTask[];
  lang: Language;
  userTier: PackageTierId;
  productCount: number;
  productLimit: number;
  balance: number;
  onOpenWithdraw: () => void;
  onOpenPackages: () => void;
  onGoToCatalog: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  orders,
  jobs,
  lang,
  userTier,
  productCount,
  productLimit,
  balance,
  onOpenWithdraw,
  onOpenPackages,
  onGoToCatalog,
}) => {
  const totalSalesVolume = orders.reduce((acc, curr) => acc + curr.sellingPrice, 0);
  const totalSellerCommission = orders.reduce((acc, curr) => acc + curr.sellerCommission, 0);
  const totalAdminCommission = orders.reduce((acc, curr) => acc + curr.adminCommission, 0);

  const deliveredCount = orders.filter((o) => o.orderStatus === 'Delivered').length;

  const slotPercent = productLimit === -1 ? 20 : Math.min(100, Math.round((productCount / productLimit) * 100));

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Header & Slot Usage Meter */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 p-6 rounded-2xl border border-purple-800/50 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-100">
              {lang === 'bn' ? 'স্বাগতম, রিসেলার হাব ড্যাশবোর্ডে!' : 'Welcome, Reseller Hub Dashboard!'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-500/30 text-xs font-bold">
              ৮০% প্রফিট শেয়ার
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'bn'
              ? 'আপনার পন্যের অর্ডারের লাভ, স্লট ব্যবহার এবং কমিশন ট্র্যাকিং একপলকে।'
              : 'Track your reseller sales, 80% commission earnings, and slot limits.'}
          </p>
        </div>

        {/* Slot Progress Meter */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 min-w-[280px] space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-300">{lang === 'bn' ? 'প্রোডাক্ট বিক্রি স্লট:' : 'Product Slot Usage:'}</span>
            <span className="text-purple-300">
              {productCount} / {productLimit === -1 ? 'আনলিমিটেড' : `${productLimit} টি`}
            </span>
          </div>

          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-purple-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${slotPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-[10px] text-slate-400">
              {productLimit === -1 ? 'VIP Unlimited' : `${productLimit - productCount} টি স্লট বাকি`}
            </span>
            <button
              onClick={onOpenPackages}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{lang === 'bn' ? 'স্লট বাড়ান' : 'Upgrade Slot'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Earned 80% Commission */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">{lang === 'bn' ? 'মোট ৮০% কমিশন আয়' : 'Your 80% Commission'}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300">
            ৳{totalSellerCommission}
          </div>
          <p className="text-[11px] text-emerald-400/80">
            {lang === 'bn' ? 'সকল সফল ডেলিভারির ৮০% প্রফিট' : '80% net profit share from sales'}
          </p>
        </div>

        {/* Total Sales Volume */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">{lang === 'bn' ? 'মোট বিক্রয় মান' : 'Total Sales Volume'}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100">
            ৳{totalSalesVolume}
          </div>
          <p className="text-[11px] text-slate-400">
            {orders.length} {lang === 'bn' ? 'টি অর্ডারের মাধ্যমে' : 'customer orders total'}
          </p>
        </div>

        {/* Payout Wallet Balance */}
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">{lang === 'bn' ? 'উইথড্রযোগ্য ব্যালেন্স' : 'Withdrawable Balance'}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">
            ৳{balance}
          </div>
          <button
            onClick={onOpenWithdraw}
            className="w-full mt-2 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 transition-all"
          >
            <span>{lang === 'bn' ? 'টাকা তুলুন (bKash/Nagad)' : 'Withdraw Cash'}</span>
          </button>
        </div>

        {/* Completed Deliveries */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider">{lang === 'bn' ? 'সফল ডেলিভারি' : 'Successful Orders'}</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100">
            {deliveredCount} / {orders.length}
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'সফল ডেলিভারি রেট ৯২%' : '92% success delivery rate'}
          </p>
        </div>

      </div>

      {/* Admin Jobs & Bonus Cash Tasks Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-slate-100">
              {lang === 'bn' ? 'অ্যাডমিন জবস ও এক্সট্রা ক্যাশ বোনাস' : 'Admin Jobs & Bonus Tasks'}
            </h3>
          </div>
          <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
            {jobs.length} {lang === 'bn' ? 'টি টাস্ক সক্রিয়' : 'Active Tasks'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-lg">
                    {lang === 'bn' ? job.rewardBn : job.rewardEn}
                  </span>
                  <span className="text-[10px] text-slate-400">মেয়াদ: {job.deadline}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200 mt-2">
                  {lang === 'bn' ? job.titleBn : job.titleEn}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn' ? job.descriptionBn : job.descriptionEn}
                </p>
              </div>

              <a
                href="https://t.me/SmartSeller1199"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-slate-700 hover:bg-purple-600 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>{lang === 'bn' ? 'কাজ শুরু করুন (টেলিগ্রাম চ্যানেল)' : 'Accept Task (Telegram Channel)'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <span>{lang === 'bn' ? 'সাম্প্রতিক কাস্টমার অর্ডার সমূহ' : 'Recent Customer Orders'}</span>
          </h3>
          
          <button
            onClick={onGoToCatalog}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'নতুন অর্ডার এন্ট্রি করুন' : 'New Order Entry'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3">অর্ডার আইডি</th>
                <th className="p-3">পণ্য</th>
                <th className="p-3">কাস্টমার</th>
                <th className="p-3">বিক্রয়মূল্য</th>
                <th className="p-3">আপনার ৮০% প্রফিট</th>
                <th className="p-3">স্টেটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-purple-300">{order.id}</td>
                  <td className="p-3 font-medium text-slate-200">{order.productNameBn}</td>
                  <td className="p-3">
                    <span className="block font-semibold">{order.customerName}</span>
                    <span className="text-[10px] text-slate-400">{order.customerPhone}</span>
                  </td>
                  <td className="p-3 font-bold text-slate-200">৳{order.sellingPrice}</td>
                  <td className="p-3">
                    <span className="font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      +৳{order.sellerCommission}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                          : 'bg-amber-950 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
