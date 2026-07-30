export const ADMIN_MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "سيروم فيتامين سي للوجه",
    sku: "SKU-VC-001",
    category: "العناية بالبشرة",
    brand: "The Ordinary",
    price: 450,
    inventory: 24,
    status: "active",
    image: "/images/placeholders/product.svg",
  },
  {
    id: "prod-2",
    name: "كريم مرطب ليلي",
    sku: "SKU-NM-002",
    category: "العناية بالبشرة",
    brand: "CeraVe",
    price: 600,
    inventory: 12,
    status: "active",
    image: "/images/placeholders/product.svg",
  },
  {
    id: "prod-3",
    name: "شامبو للشعر المصبوغ",
    sku: "SKU-HS-003",
    category: "العناية بالشعر",
    brand: "L'Oreal",
    price: 350,
    inventory: 0,
    status: "out_of_stock",
    image: "/images/placeholders/product.svg",
  },
];

export const ADMIN_MOCK_CATEGORIES = [
  { id: "cat-1", name: "العناية بالبشرة", slug: "skincare", productCount: 156, status: "active" },
  { id: "cat-2", name: "العناية بالشعر", slug: "haircare", productCount: 84, status: "active" },
  { id: "cat-3", name: "المكياج", slug: "makeup", productCount: 210, status: "active" },
];

export const ADMIN_MOCK_BRANDS = [
  { id: "brand-1", name: "The Ordinary", logo: "/images/placeholders/brand.svg", productCount: 42 },
  { id: "brand-2", name: "CeraVe", logo: "/images/placeholders/brand.svg", productCount: 28 },
  { id: "brand-3", name: "La Roche-Posay", logo: "/images/placeholders/brand.svg", productCount: 35 },
];

export const ADMIN_MOCK_COUPONS = [
  { id: "cpn-1", code: "WELCOME20", discount: "20%", type: "percentage", usage: "145/500", status: "active" },
  { id: "cpn-2", code: "SUMMER50", discount: "50 ج.م", type: "fixed", usage: "82/200", status: "expired" },
];

export const ADMIN_MOCK_PAGES = [
  { id: "pg-1", title: "من نحن", slug: "about-us", lastModified: "2024-03-15" },
  { id: "pg-2", title: "سياسة الخصوصية", slug: "privacy-policy", lastModified: "2024-02-20" },
  { id: "pg-3", title: "الشروط والأحكام", slug: "terms-conditions", lastModified: "2024-02-20" },
];

export const ADMIN_MOCK_ORDERS = [
  {
    id: "ORD-1001",
    userId: "user-1",
    customerName: "سارة أحمد",
    customerEmail: "sara@example.com",
    status: "delivered",
    subtotal: 1050,
    tax: 50,
    shippingCost: 50,
    total: 1150,
    paymentMethod: "card",
    paymentStatus: "paid",
    itemsCount: 3,
    createdAt: "2024-03-10T14:30:00Z",
    shippingAddress: {
      fullName: "سارة أحمد",
      phoneNumber: "01012345678",
      governorate: "القاهرة",
      city: "القاهرة الجديدة",
      area: "التجمع الخامس",
      street: "شارع التسعين",
    },
    timeline: [
      { id: "t-1", status: "pending", title: "تم استلام الطلب", timestamp: "2024-03-10T14:30:00Z" },
      { id: "t-2", status: "payment_received", title: "تم تأكيد الدفع", timestamp: "2024-03-10T14:35:00Z" },
      { id: "t-3", status: "processing", title: "جاري تجهيز الطلب", timestamp: "2024-03-10T16:00:00Z" },
      { id: "t-4", status: "shipped", title: "تم الشحن", timestamp: "2024-03-11T10:00:00Z" },
      { id: "t-5", status: "delivered", title: "تم التوصيل", timestamp: "2024-03-12T15:00:00Z" },
    ]
  },
  {
    id: "ORD-1002",
    userId: "user-2",
    customerName: "محمد علي",
    customerEmail: "mohamed@example.com",
    status: "processing",
    subtotal: 450,
    tax: 20,
    shippingCost: 50,
    total: 520,
    paymentMethod: "cod",
    paymentStatus: "pending_cod",
    itemsCount: 1,
    createdAt: "2024-03-14T09:15:00Z",
    shippingAddress: {
      fullName: "محمد علي",
      phoneNumber: "01187654321",
      governorate: "الجيزة",
      city: "6 أكتوبر",
      area: "الحي المتميز",
      street: "شارع 26 يوليو",
    },
    timeline: [
      { id: "t-1", status: "pending", title: "تم استلام الطلب", timestamp: "2024-03-14T09:15:00Z" },
      { id: "t-2", status: "processing", title: "جاري تجهيز الطلب", timestamp: "2024-03-14T11:00:00Z" },
    ]
  },
  {
    id: "ORD-1003",
    userId: "user-3",
    customerName: "ليلى محمود",
    customerEmail: "layla@example.com",
    status: "pending",
    subtotal: 2100,
    tax: 100,
    shippingCost: 0,
    total: 2200,
    paymentMethod: "card",
    paymentStatus: "pending",
    itemsCount: 5,
    createdAt: "2024-03-15T11:45:00Z",
    shippingAddress: {
      fullName: "ليلى محمود",
      phoneNumber: "01234567890",
      governorate: "الإسكندرية",
      city: "الإسكندرية",
      area: "سموحة",
      street: "شارع فوزي معاذ",
    },
    timeline: [
      { id: "t-1", status: "pending", title: "تم استلام الطلب", timestamp: "2024-03-15T11:45:00Z" },
    ]
  }
];

export const ADMIN_MOCK_CUSTOMERS = [
  {
    id: "user-1",
    fullName: "سارة أحمد",
    email: "sara@example.com",
    phoneNumber: "01012345678",
    loyaltyTier: "gold",
    loyaltyPoints: 1250,
    ordersCount: 8,
    totalSpent: 12450,
    lastOrderDate: "2024-03-10",
    status: "active",
    createdAt: "2023-05-12",
    addresses: [
      { id: "addr-1", isDefault: true, fullName: "سارة أحمد", phoneNumber: "01012345678", governorate: "القاهرة", city: "القاهرة الجديدة", area: "التجمع الخامس", street: "شارع التسعين" }
    ]
  },
  {
    id: "user-2",
    fullName: "محمد علي",
    email: "mohamed@example.com",
    phoneNumber: "01187654321",
    loyaltyTier: "silver",
    loyaltyPoints: 450,
    ordersCount: 3,
    totalSpent: 3200,
    lastOrderDate: "2024-03-14",
    status: "active",
    createdAt: "2023-11-20",
    addresses: [
      { id: "addr-2", isDefault: true, fullName: "محمد علي", phoneNumber: "01187654321", governorate: "الجيزة", city: "6 أكتوبر", area: "الحي المتميز", street: "شارع 26 يوليو" }
    ]
  }
];

export const ADMIN_MOCK_MESSAGES = [
  { id: "msg-1", name: "أحمد حسن", email: "ahmed@example.com", subject: "استفسار عن منتج", message: "هل يتوفر سيروم فيتامين سي حالياً؟", status: "new", createdAt: "2024-03-15T10:00:00Z" },
  { id: "msg-2", name: "منى زكي", email: "mona@example.com", subject: "مشكلة في التوصيل", message: "تأخر الطلب الخاص بي لأكثر من 3 أيام.", status: "read", createdAt: "2024-03-14T15:30:00Z" },
];

export const ADMIN_MOCK_SUBSCRIBERS = [
  { id: "sub-1", email: "user1@example.com", status: "subscribed", subscribedAt: "2024-01-10" },
  { id: "sub-2", email: "user2@example.com", status: "subscribed", subscribedAt: "2024-02-15" },
];

export const ADMIN_MOCK_AUDIT_LOGS = [
  { id: "log-1", adminId: "admin-1", adminName: "Super Admin", action: "تعديل منتج", targetType: "Product", targetId: "prod-1", details: "تغيير السعر من 400 إلى 450", ipAddress: "192.168.1.1", createdAt: "2024-03-15T12:00:00Z" },
  { id: "log-2", adminId: "admin-1", adminName: "Super Admin", action: "تغيير حالة طلب", targetType: "Order", targetId: "ORD-1002", details: "تغيير الحالة إلى 'جاري التجهيز'", ipAddress: "192.168.1.1", createdAt: "2024-03-14T11:00:00Z" },
];

export const _ADMIN_MOCK_REVENUE_DATA = [
  { date: "2024-03-01", revenue: 5000, orders: 12 },
  { date: "2024-03-02", revenue: 7500, orders: 18 },
  { date: "2024-03-03", revenue: 4200, orders: 10 },
  { date: "2024-03-04", revenue: 8900, orders: 22 },
  { date: "2024-03-05", revenue: 6300, orders: 15 },
  { date: "2024-03-06", revenue: 11000, orders: 25 },
  { date: "2024-03-07", revenue: 9500, orders: 20 },
];
