import { CategoryCardProps } from "@/components/design-system/ecommerce/CategoryCard";
import { ProductCardProps } from "@/components/design-system/ecommerce/ProductCard";

export const MOCK_CATEGORIES: CategoryCardProps[] = [
  {
    name: "العناية بالبشرة",
    slug: "skincare",
    imageUrl: "/images/categories/skincare.jpg",
    description: "منتجات مختارة لبشرة صحية ومشرقة.",
    count: 120,
  },
  {
    name: "العناية بالشعر",
    slug: "haircare",
    imageUrl: "/images/categories/haircare.jpg",
    description: "حلول متكاملة لشعر قوي ولامع.",
    count: 85,
  },
  {
    name: "المكياج",
    slug: "makeup",
    imageUrl: "/images/categories/makeup.jpg",
    description: "أحدث صيحات المكياج لجمالك.",
    count: 150,
  },
  {
    name: "العطور",
    slug: "fragrances",
    imageUrl: "/images/categories/fragrances.jpg",
    description: "عطور فاخرة تدوم طويلاً.",
    count: 60,
  },
];

export const MOCK_PRODUCTS: ProductCardProps[] = [
  {
    id: "prod-001",
    title: "سيروم فيتامين سي المشرق",
    slug: "brightening-vitamin-c-serum",
    imageUrl: "/images/products/serum-vitc.jpg",
    price: 120.00,
    currency: "EGP",
    originalPrice: 150.00,
    rating: 4.5,
    reviewCount: 75,
    badge: "sale",
    discount: 20,
    isWishlisted: false,
  },
  {
    id: "prod-002",
    title: "كريم الليل لتجديد البشرة",
    slug: "skin-renewing-night-cream",
    imageUrl: "/images/products/night-cream.jpg",
    price: 200.00,
    currency: "EGP",
    rating: 4.8,
    reviewCount: 120,
    isWishlisted: true,
  },
  {
    id: "prod-003",
    title: "ماسك الطين المنقي",
    slug: "purifying-clay-mask",
    imageUrl: "/images/products/clay-mask.jpg",
    price: 80.00,
    currency: "EGP",
    rating: 4.2,
    reviewCount: 50,
    isWishlisted: false,
  },
  {
    id: "prod-004",
    title: "زيت الأرغان للشعر",
    slug: "argan-hair-oil",
    imageUrl: "/images/products/argan-oil.jpg",
    price: 95.00,
    currency: "EGP",
    originalPrice: 110.00,
    rating: 4.7,
    reviewCount: 90,
    badge: "new",
    isWishlisted: false,
  },
];

export interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
}

export const MOCK_ARTICLES: ArticleCardProps[] = [
  {
    id: "art-001",
    title: "روتين العناية بالبشرة في الشتاء",
    slug: "winter-skincare-routine",
    imageUrl: "/images/articles/winter-skincare.jpg",
    category: "العناية بالبشرة",
    readTime: "5 دقائق",
    date: "2023-10-26",
  },
  {
    id: "art-002",
    title: "أسرار الشعر الصحي اللامع",
    slug: "secrets-healthy-shiny-hair",
    imageUrl: "/images/articles/healthy-hair.jpg",
    category: "العناية بالشعر",
    readTime: "7 دقائق",
    date: "2023-09-15",
  },
  {
    id: "art-003",
    title: "دليل المكياج للمبتدئات",
    slug: "makeup-guide-beginners",
    imageUrl: "/images/articles/makeup-guide.jpg",
    category: "المكياج",
    readTime: "10 دقائق",
    date: "2023-08-01",
  },
];

export interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const MOCK_TESTIMONIALS: TestimonialProps[] = [
  {
    id: "test-001",
    quote: "منتجات رائعة وخدمة عملاء ممتازة! بشرتي لم تكن بهذا النضارة من قبل.",
    author: "فاطمة الزهراء",
    location: "القاهرة، مصر",
    rating: 5,
  },
  {
    id: "test-002",
    quote: "أحببت مجموعة العناية بالشعر، لقد غيرت شعري تمامًا. أنصح بها بشدة.",
    author: "ليلى أحمد",
    location: "دبي، الإمارات العربية المتحدة",
    rating: 5,
  },
  {
    id: "test-003",
    quote: "التوصيل سريع والمنتجات أصلية. تجربة تسوق ممتازة.",
    author: "مريم خالد",
    location: "الرياض، المملكة العربية السعودية",
    rating: 4,
  },
];
