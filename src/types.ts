export type UserRole = 'seller' | 'admin';

export type Language = 'bn' | 'en';

export type PackageTierId = 'free' | 'premium' | 'platinum' | 'golden' | 'vip';

export interface PackageTier {
  id: PackageTierId;
  nameBn: string;
  nameEn: string;
  price: number; // in BDT (৳)
  productLimit: number; // -1 for unlimited
  badgeColor: string;
  featuresBn: string[];
  featuresEn: string[];
  popular?: boolean;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  categoryBn: string;
  categoryEn: string;
  image: string;
  descriptionBn: string;
  descriptionEn: string;
  wholesalePrice: number; // পাইকারি মূল্য (৳)
  minSellingPrice: number; // সর্বনিম্ন বিক্রয়মূল্য (৳)
  maxSellingPrice: number; // সর্বোচ্চ বিক্রয়মূল্য (৳)
  stock: number;
  totalSold: number;
}

export interface Order {
  id: string;
  productId: string;
  productNameBn: string;
  sellerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  wholesalePrice: number;
  sellingPrice: number;
  totalProfit: number;
  sellerCommission: number; // 80%
  adminCommission: number; // 20%
  paymentStatus: 'Paid' | 'Pending' | 'COD';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  packageId: PackageTierId;
  packageName: string;
  amount: number;
  method: 'bKash' | 'Nagad';
  targetNumber: string;
  transactionId: string;
  status: 'Pending' | 'AI_Approved' | 'Admin_Approved' | 'Rejected';
  aiConfidence?: number;
  aiReasoning?: string;
  submittedAt: string;
}

export interface JobTask {
  id: string;
  titleBn: string;
  titleEn: string;
  rewardBn: string;
  rewardEn: string;
  descriptionBn: string;
  descriptionEn: string;
  deadline: string;
  status: 'Active' | 'Completed' | 'Closed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
