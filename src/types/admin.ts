import { Order, OrderStatus, UserProfile, ShippingAddress } from "./index";

export interface AdminOrder extends Order {
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  trackingNumber?: string;
  shippingMethod?: string;
  notes?: string;
  timeline: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  id: string;
  status: OrderStatus | "payment_received" | "refund_initiated" | "refund_completed" | "note_added";
  title: string;
  description?: string;
  timestamp: string;
  actor?: string;
}

export interface AdminCustomer extends UserProfile {
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: "active" | "blocked";
  notes?: string;
  addresses: (ShippingAddress & { id: string; isDefault: boolean })[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  subscribedAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface SalesReport {
  period: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topCategories: { name: string; revenue: number }[];
  topProducts: { name: string; sales: number }[];
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}
