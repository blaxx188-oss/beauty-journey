/**
 * Governorate Data — Egyptian governorates and cities for shipping.
 * Includes shipping cost estimation per governorate.
 */

import type { Governorate } from "@/types";

export const EGYPT_GOVERNORATES: Governorate[] = [
  {
    name: "Cairo",
    nameAr: "القاهرة",
    cities: [
      { name: "Nasr City", nameAr: "مدينة نصر" },
      { name: "Maadi", nameAr: "المعادي" },
      { name: "Heliopolis", nameAr: "مصر الجديدة" },
      { name: "Zamalek", nameAr: "الزمالك" },
      { name: "Downtown", nameAr: "وسط البلد" },
      { name: "Shubra", nameAr: "شبرا" },
      { name: "Mohandessin", nameAr: "المهندسين" },
      { name: "Dokki", nameAr: "الدقي" },
      { name: "Agouza", nameAr: "العجوزة" },
      { name: "Hadayek Al-Qobba", nameAr: "حدائق القبة" },
      { name: "Ain Shams", nameAr: "عين شمس" },
      { name: "New Cairo", nameAr: "القاهرة الجديدة" },
      { name: "Rehab City", nameAr: "مدينة الرحاب" },
      { name: "Madinty", nameAr: "مدينتي" },
    ],
    shippingCost: 60,
  },
  {
    name: "Giza",
    nameAr: "الجيزة",
    cities: [
      { name: "6th of October", nameAr: "6 أكتوبر" },
      { name: "Sheikh Zayed", nameAr: "الشيخ زايد" },
      { name: "Giza", nameAr: "الجيزة" },
      { name: "Haram", nameAr: "الهرم" },
      { name: "Faisal", nameAr: "فيصل" },
      { name: "Imbaba", nameAr: "إمبابة" },
      { name: "Bulaq Al-Dakrour", nameAr: "بولاق الدكرور" },
    ],
    shippingCost: 65,
  },
  {
    name: "Alexandria",
    nameAr: "الإسكندرية",
    cities: [
      { name: "Smouha", nameAr: "سموحة" },
      { name: "Sidi Gaber", nameAr: "سيدي جابر" },
      { name: "Sidi Bishr", nameAr: "سيدي بشر" },
      { name: "Miami", nameAr: "ميامي" },
      { name: "Stanley", nameAr: "ستانلي" },
      { name: "Sporting", nameAr: "سبورتنج" },
      { name: "Glim", nameAr: "غليم" },
      { name: "Kafr Abdo", nameAr: "كفر عبده" },
      { name: "Bahary", nameAr: "البحري" },
      { name: "Montazah", nameAr: "المنتزه" },
    ],
    shippingCost: 75,
  },
  {
    name: "Dakahlia",
    nameAr: "الدقهلية",
    cities: [
      { name: "Mansoura", nameAr: "المنصورة" },
      { name: "Talkha", nameAr: "طلخا" },
      { name: "Bilqas", nameAr: "بلقاس" },
      { name: "Mit Ghamr", nameAr: "ميت غمر" },
      { name: "Dekernes", nameAr: "دكرنس" },
    ],
    shippingCost: 80,
  },
  {
    name: "Sharqia",
    nameAr: "الشرقية",
    cities: [
      { name: "Zagazig", nameAr: "الزقازيق" },
      { name: "10th of Ramadan", nameAr: "10 رمضان" },
      { name: "Bilbais", nameAr: "بلبيس" },
      { name: "Abu Hammad", nameAr: "أبو حماد" },
      { name: "Kafr Saqr", nameAr: "كفر صقر" },
    ],
    shippingCost: 80,
  },
  {
    name: "Beheira",
    nameAr: "البحيرة",
    cities: [
      { name: "Damanhour", nameAr: "دمنهور" },
      { name: "Kafr El-Dawwar", nameAr: "كفر الدوار" },
      { name: "Rosetta", nameAr: "رشيد" },
      { name: "Itay El-Baroud", nameAr: "إيتاي البارود" },
      { name: "Abou Homous", nameAr: "أبو حمص" },
    ],
    shippingCost: 80,
  },
  {
    name: "Gharbia",
    nameAr: "الغربية",
    cities: [
      { name: "Tanta", nameAr: "طنطا" },
      { name: "El-Mahalla El-Kubra", nameAr: "المحلة الكبرى" },
      { name: "Kafr El-Zayat", nameAr: "كفر الزيات" },
      { name: "Zefta", nameAr: "زفتى" },
      { name: "Basyoun", nameAr: "بسيون" },
    ],
    shippingCost: 85,
  },
  {
    name: "Qalyubia",
    nameAr: "القليوبية",
    cities: [
      { name: "Benha", nameAr: "بنها" },
      { name: "Shubra El-Kheima", nameAr: "شبرا الخيمة" },
      { name: "Qalyub", nameAr: "قليوب" },
      { name: "Obour", nameAr: "العبور" },
      { name: "El-Shorouk", nameAr: "الشروق" },
      { name: "Badar City", nameAr: "مدينة بدر" },
    ],
    shippingCost: 65,
  },
  {
    name: "Kafr El-Sheikh",
    nameAr: "كفر الشيخ",
    cities: [
      { name: "Kafr El-Sheikh", nameAr: "كفر الشيخ" },
      { name: "Desouk", nameAr: "دسوق" },
      { name: "Baltim", nameAr: "بلطيم" },
      { name: "Sidi Salem", nameAr: "سيدي سالم" },
    ],
    shippingCost: 85,
  },
  {
    name: "Ismailia",
    nameAr: "الإسماعيلية",
    cities: [
      { name: "Ismailia", nameAr: "الإسماعيلية" },
      { name: "El-Qantara", nameAr: "القنطرة شرق" },
      { name: "Fayed", nameAr: "فايد" },
      { name: "El-Tal El-Kabir", nameAr: "التل الكبير" },
    ],
    shippingCost: 85,
  },
  {
    name: "Suez",
    nameAr: "السويس",
    cities: [
      { name: "Suez", nameAr: "السويس" },
      { name: "Attaka", nameAr: "عتاقة" },
      { name: "Ain Sukhna", nameAr: "العين السخنة" },
      { name: "Arbaeen", nameAr: "الأربعين" },
    ],
    shippingCost: 85,
  },
  {
    name: "Port Said",
    nameAr: "بورسعيد",
    cities: [
      { name: "Port Said", nameAr: "بورسعيد" },
      { name: "El-Arab", nameAr: "العرب" },
      { name: "El-Manakh", nameAr: "المناخ" },
    ],
    shippingCost: 85,
  },
  {
    name: "Damietta",
    nameAr: "دمياط",
    cities: [
      { name: "Damietta", nameAr: "دمياط" },
      { name: "New Damietta", nameAr: "دمياط الجديدة" },
      { name: "Kafr Saad", nameAr: "كفر سعد" },
      { name: "Ras El-Bar", nameAr: "رأس البر" },
    ],
    shippingCost: 85,
  },
  {
    name: "Monufia",
    nameAr: "المنوفية",
    cities: [
      { name: "Shibin El-Kom", nameAr: "شبين الكوم" },
      { name: "Menouf", nameAr: "منوف" },
      { name: "Ashmoun", nameAr: "أشمون" },
      { name: "Sers El-Lyan", nameAr: "سرس الليان" },
    ],
    shippingCost: 80,
  },
  {
    name: "Beni Suef",
    nameAr: "بني سويف",
    cities: [
      { name: "Beni Suef", nameAr: "بني سويف" },
      { name: "Wasta", nameAr: "واسطى" },
      { name: "El Fashn", nameAr: "الفشن" },
      { name: "Beba", nameAr: "ببا" },
    ],
    shippingCost: 90,
  },
  {
    name: "Fayoum",
    nameAr: "الفيوم",
    cities: [
      { name: "Fayoum", nameAr: "الفيوم" },
      { name: "Tamia", nameAr: "طامية" },
      { name: "Ibsheway", nameAr: "إبشواي" },
      { name: "Youssef El-Seddiq", nameAr: "يوسف الصديق" },
    ],
    shippingCost: 90,
  },
  {
    name: "Minya",
    nameAr: "المنيا",
    cities: [
      { name: "Minya", nameAr: "المنيا" },
      { name: "Mallawi", nameAr: "ملوي" },
      { name: "Samalout", nameAr: "سمالوط" },
      { name: "Beni Mazar", nameAr: "بني مزار" },
    ],
    shippingCost: 90,
  },
  {
    name: "Assiut",
    nameAr: "أسيوط",
    cities: [
      { name: "Assiut", nameAr: "أسيوط" },
      { name: "Dairut", nameAr: "ديروط" },
      { name: "Manfalut", nameAr: "منفلوط" },
      { name: "Abnoub", nameAr: "أبنوب" },
    ],
    shippingCost: 95,
  },
  {
    name: "Sohag",
    nameAr: "سوهاج",
    cities: [
      { name: "Sohag", nameAr: "سوهاج" },
      { name: "Akhmim", nameAr: "أخميم" },
      { name: "Girga", nameAr: "جرجا" },
      { name: "Tima", nameAr: "طما" },
    ],
    shippingCost: 95,
  },
  {
    name: "Qena",
    nameAr: "قنا",
    cities: [
      { name: "Qena", nameAr: "قنا" },
      { name: "Nag Hammadi", nameAr: "نجع حمادي" },
      { name: "Qus", nameAr: "قفط" },
      { name: "Ibshar", nameAr: "أبو تشت" },
    ],
    shippingCost: 100,
  },
  {
    name: "Luxor",
    nameAr: "الأقصر",
    cities: [
      { name: "Luxor", nameAr: "الأقصر" },
      { name: "Esna", nameAr: "إسنا" },
      { name: "Armant", nameAr: "أرمنت" },
    ],
    shippingCost: 100,
  },
  {
    name: "Aswan",
    nameAr: "أسوان",
    cities: [
      { name: "Aswan", nameAr: "أسوان" },
      { name: "Kom Ombo", nameAr: "كوم أمبو" },
      { name: "Daraw", nameAr: "دراو" },
      { name: "Edfu", nameAr: "إدفو" },
    ],
    shippingCost: 100,
  },
  {
    name: "Red Sea",
    nameAr: "البحر الأحمر",
    cities: [
      { name: "Hurghada", nameAr: "الغردقة" },
      { name: "Marsa Alam", nameAr: "مرسى علم" },
      { name: "El Gouna", nameAr: "الغونة" },
      { name: "Safaga", nameAr: "سفاجا" },
    ],
    shippingCost: 110,
  },
  {
    name: "North Sinai",
    nameAr: "شمال سيناء",
    cities: [
      { name: "Arish", nameAr: "العريش" },
      { name: "Sheikh Zuweid", nameAr: "الشيخ زويد" },
      { name: "Rafah", nameAr: "رفح" },
      { name: "Bir El-Abd", nameAr: "بئر العبد" },
    ],
    shippingCost: 110,
  },
  {
    name: "South Sinai",
    nameAr: "جنوب سيناء",
    cities: [
      { name: "Sharm El-Sheikh", nameAr: "شرم الشيخ" },
      { name: "Dahab", nameAr: "دهب" },
      { name: "Nuweiba", nameAr: "نويبع" },
      { name: "St. Catherine", nameAr: "سانت كاترين" },
      { name: "Taba", nameAr: "طابا" },
    ],
    shippingCost: 110,
  },
  {
    name: "New Valley",
    nameAr: "الوادي الجديد",
    cities: [
      { name: "Kharga", nameAr: "الخارجة" },
      { name: "Dakhla", nameAr: "داخلة" },
      { name: "Baris", nameAr: "باريس" },
      { name: "Farafra", nameAr: "فرافرة" },
    ],
    shippingCost: 120,
  },
  {
    name: "Matrouh",
    nameAr: "مطروح",
    cities: [
      { name: "Marsa Matrouh", nameAr: "مرسى مطروح" },
      { name: "El-Alamein", nameAr: "العلمين" },
      { name: "Sidi Barrani", nameAr: "سيدي براني" },
      { name: "Siwa", nameAr: "سيوة" },
    ],
    shippingCost: 110,
  },
];

/**
 * Get shipping cost by governorate name.
 */
export function getShippingCostByGovernorate(governorateName: string): number {
  const gov = EGYPT_GOVERNORATES.find(
    (g) => g.nameAr === governorateName || g.name === governorateName
  );
  return gov?.shippingCost ?? 60; // Default to Cairo rate
}

/**
 * Get governorate by name.
 */
export function getGovernorateByName(name: string): Governorate | undefined {
  return EGYPT_GOVERNORATES.find(
    (g) => g.nameAr === name || g.name === name
  );
}

/**
 * Get cities for a governorate.
 */
export function getCitiesForGovernorate(governorateName: string): { name: string; nameAr: string }[] {
  const gov = getGovernorateByName(governorateName);
  return gov?.cities ?? [];
}

/**
 * Get all governorate options for select dropdown.
 */
export function getGovernorateOptions() {
  return EGYPT_GOVERNORATES.map((g) => ({
    value: g.nameAr,
    label: g.nameAr,
  }));
}

/**
 * Estimate shipping cost based on governorate and cart subtotal.
 */
export function estimateShippingCost(
  governorateName: string,
  subtotal: number
): { cost: number; isFree: boolean; estimatedDays: string } {
  const baseCost = getShippingCostByGovernorate(governorateName);
  const FREE_SHIPPING_THRESHOLD = 500;

  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const cost = isFree ? 0 : baseCost;

  // Estimated days vary by governorate
  const gov = getGovernorateByName(governorateName);
  let estimatedDays = "2-4 أيام عمل";

  if (gov) {
    if (gov.name === "Cairo" || gov.name === "Giza") {
      estimatedDays = "1-2 أيام عمل";
    } else if (["Alexandria", "Qalyubia"].includes(gov.name)) {
      estimatedDays = "2-3 أيام عمل";
    } else if (["Red Sea", "South Sinai", "North Sinai", "New Valley"].includes(gov.name)) {
      estimatedDays = "3-5 أيام عمل";
    }
  }

  return { cost, isFree, estimatedDays };
}
