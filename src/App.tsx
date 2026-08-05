import React, { useState } from 'react';
import { UserRole, Language, PackageTierId, Product, Order, PaymentTransaction, JobTask } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_TRANSACTIONS, INITIAL_JOBS, PACKAGE_TIERS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { SellerDashboard } from './components/SellerDashboard';
import { PackageUpgrade } from './components/PackageUpgrade';
import { AdminDashboard } from './components/AdminDashboard';
import { AIChatAssistant } from './components/AIChatAssistant';
import { ProfitCalculatorModal } from './components/ProfitCalculatorModal';
import { OrderModal } from './components/OrderModal';
import { TelegramSupportModal } from './components/TelegramSupportModal';
import { WithdrawalModal } from './components/WithdrawalModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<UserRole>('seller');
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'packages' | 'admin' | 'ai-chat'>('catalog');
  const [userTier, setUserTier] = useState<PackageTierId>('free');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [jobs, setJobs] = useState<JobTask[]>(INITIAL_JOBS);
  const [balance, setBalance] = useState<number>(2440);

  // Modals state
  const [selectedCalcProduct, setSelectedCalcProduct] = useState<Product | null>(null);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState<Product | null>(null);
  const [orderSellingPrice, setOrderSellingPrice] = useState<number>(0);

  const [showTelegramModal, setShowTelegramModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

  // Active product slot limit calculation based on current plan
  const getCurrentLimit = () => {
    const tier = PACKAGE_TIERS.find((p) => p.id === userTier);
    return tier ? tier.productLimit : 15;
  };

  const productLimit = getCurrentLimit();
  const productCount = orders.length * 4; // Simulated active product slots used

  // Upgrade Tier callback
  const handleUpgradeSuccess = (newTier: PackageTierId, tx: PaymentTransaction) => {
    setUserTier(newTier);
    setTransactions([tx, ...transactions]);
    setActiveTab('catalog');
  };

  // Submit new customer order
  const handleSubmitOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setBalance((prev) => prev + newOrder.sellerCommission);
  };

  // Handle Withdraw Callback
  const handleWithdrawSuccess = (amount: number) => {
    setBalance((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-20 md:pb-12">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-900/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        
        {/* Navigation Bar */}
        <Navbar
          role={role}
          setRole={setRole}
          lang={lang}
          setLang={setLang}
          userTier={userTier}
          productCount={productCount}
          productLimit={productLimit}
          balance={balance}
          onOpenPackages={() => setActiveTab('packages')}
          onOpenTelegram={() => setShowTelegramModal(true)}
          onOpenAIChat={() => setActiveTab('ai-chat')}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Body Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            
            {/* CATALOG VIEW */}
            {activeTab === 'catalog' && (
              <motion.div
                key="catalog"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCatalog
                  products={products}
                  lang={lang}
                  onOpenCalculator={(p) => setSelectedCalcProduct(p)}
                  onOpenOrder={(p, price) => {
                    setSelectedOrderProduct(p);
                    setOrderSellingPrice(price);
                  }}
                  productCount={productCount}
                  productLimit={productLimit}
                  onUpgradeClick={() => setActiveTab('packages')}
                />
              </motion.div>
            )}

            {/* SELLER DASHBOARD VIEW */}
            {activeTab === 'dashboard' && role === 'seller' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <SellerDashboard
                  orders={orders}
                  jobs={jobs}
                  lang={lang}
                  userTier={userTier}
                  productCount={productCount}
                  productLimit={productLimit}
                  balance={balance}
                  onOpenWithdraw={() => setShowWithdrawModal(true)}
                  onOpenPackages={() => setActiveTab('packages')}
                  onGoToCatalog={() => setActiveTab('catalog')}
                />
              </motion.div>
            )}

            {/* PACKAGE UPGRADE TIERS VIEW */}
            {activeTab === 'packages' && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <PackageUpgrade
                  currentTier={userTier}
                  lang={lang}
                  onUpgradeSuccess={handleUpgradeSuccess}
                />
              </motion.div>
            )}

            {/* ADMIN PANEL VIEW */}
            {activeTab === 'admin' && role === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AdminDashboard
                  products={products}
                  setProducts={setProducts}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  jobs={jobs}
                  setJobs={setJobs}
                  orders={orders}
                  lang={lang}
                />
              </motion.div>
            )}

            {/* AI ASSISTANT CHAT VIEW */}
            {activeTab === 'ai-chat' && (
              <motion.div
                key="ai-chat"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AIChatAssistant
                  lang={lang}
                  userTier={userTier}
                  productCount={productCount}
                  balance={balance}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* MODALS */}

        {/* 1. Profit Calculator Modal */}
        {selectedCalcProduct && (
          <ProfitCalculatorModal
            product={selectedCalcProduct}
            lang={lang}
            onClose={() => setSelectedCalcProduct(null)}
            onOrderNow={(p, price) => {
              setSelectedOrderProduct(p);
              setOrderSellingPrice(price);
            }}
          />
        )}

        {/* 2. Order Placement Modal */}
        {selectedOrderProduct && (
          <OrderModal
            product={selectedOrderProduct}
            initialSellingPrice={orderSellingPrice}
            lang={lang}
            onClose={() => setSelectedOrderProduct(null)}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {/* 3. Telegram & Helpline Support Modal */}
        {showTelegramModal && (
          <TelegramSupportModal
            lang={lang}
            onClose={() => setShowTelegramModal(false)}
          />
        )}

        {/* 4. Earnings Withdrawal Modal */}
        {showWithdrawModal && (
          <WithdrawalModal
            balance={balance}
            lang={lang}
            onClose={() => setShowWithdrawModal(false)}
            onWithdrawSuccess={handleWithdrawSuccess}
          />
        )}

      </div>
    </div>
  );
}
