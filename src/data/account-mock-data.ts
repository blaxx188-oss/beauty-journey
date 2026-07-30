export const MOCK_ORDERS = [
  {
    id: "ORD-12345",
    date: "2024-03-15",
    total: 1250.00,
    status: "delivered",
    statusText: "تم التوصيل",
    items: 3,
  },
  {
    id: "ORD-12346",
    date: "2024-03-20",
    total: 850.00,
    status: "processing",
    statusText: "جاري التجهيز",
    items: 1,
  },
  {
    id: "ORD-12347",
    date: "2024-03-25",
    total: 2100.00,
    status: "shipped",
    statusText: "تم الشحن",
    items: 4,
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "تم شحن طلبك!",
    message: "طلبك رقم ORD-12347 في الطريق إليك الآن.",
    time: "منذ ساعتين",
    isRead: false,
    type: "order"
  },
  {
    id: 2,
    title: "عرض خاص لكِ",
    message: "خصم 20% على منتجات العناية بالبشرة لفترة محدودة.",
    time: "منذ 5 ساعات",
    isRead: true,
    type: "promo"
  }
];

export const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    title: "المنزل",
    name: "سارة أحمد",
    phone: "01012345678",
    city: "القاهرة",
    area: "المعادي",
    details: "شارع 9، عمارة 15، شقة 4",
    isDefault: true
  },
  {
    id: "addr-2",
    title: "العمل",
    name: "سارة أحمد",
    phone: "01012345678",
    city: "الجيزة",
    area: "الشيخ زايد",
    details: "مبنى كابيتال بيزنس بارك، مكتب 202",
    isDefault: false
  }
];
