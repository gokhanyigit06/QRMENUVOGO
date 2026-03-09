
export interface WebsiteSettings {
  about?: {
    title?: string;
    content?: string;
    imageUrl?: string;
  };
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    mapEmbedCode?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  custom_domain?: string | null;
  website_domain?: string | null;
  website_settings?: WebsiteSettings;
  is_ordering_active?: boolean;
  is_waiter_mode_active?: boolean;

  // + Yeni Özellikler: Abonelik ve Şubeleşme
  plan_type?: 'BASIC' | 'PRO' | 'PLUS';
  plan_expires_at?: string | null; // VIP üyelik bitiş tarihi
  parent_id?: string | null; // Boş ise Marka Sahibi, Dolu ise bir Şube
}

export interface Category {
  id: string;
  restaurantId?: string;
  name: string;
  nameEn?: string;
  slug: string;
  parentId?: string;
  image?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: 'small' | 'medium' | 'large';
  description?: string;
  discountRate?: number;
  badge?: string | null;
  order: number;
  layout_mode?: 'grid' | 'list' | 'list-no-image' | 'medium';
  segment?: 'food' | 'drink'; // + PLUS: Departman/Segment ayrımı (YEMEKLER | İÇECEKLER)

  // + PLUS: Zaman Ayarlı Görünürlük
  visibility_start_time?: string | null; // Örn: "08:00"
  visibility_end_time?: string | null;   // Örn: "12:00"
  visibility_days?: number[];            // Örn: [1,2,3,4,5] (1:Pazartesi)
  station_name?: 'Mutfak' | 'Bar' | string;
}

export interface ProductTag {
  id: string;
  name: string;
  icon?: 'pepper' | 'leaf' | 'wheat';
  color?: string;
}

export interface Product {
  id: string;
  restaurantId?: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price?: number | null;
  discountPrice?: number | null;
  image: string;
  categoryId: string;
  badge?: string;
  tags?: ProductTag[];
  allergens?: string[];
  isActive?: boolean;
  sortOrder?: number;
  variants?: { name: string; price: number | null }[];
}

export interface SiteSettings {
  id?: string;
  restaurantId?: string;
  themeId?: 'default' | 'modern' | 'minimal' | 'elegant' | 'elite' | 'elegance' | 'vibrant' | 'neon' | 'rustic' | 'paper' | 'custom';
  menuLayout?: 'accordion' | 'list' | 'grid' | 'tabs' | 'masonry' | 'cards' | 'minimal-list' | 'paper';
  themeColor: 'black' | 'red' | 'blue' | 'green' | 'orange' | 'white';
  fontFamily?: string;
  darkMode: boolean;
  bannerActive: boolean;
  bannerUrls: string[];
  bannerOverlayVisible?: boolean;
  bannerTag?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  mobileBannerUrls?: string[];
  popupActive: boolean;
  popupUrl: string;
  logoUrl: string;
  logoWidth: number;
  siteName?: string;
  siteDescription?: string;
  defaultProductImage?: string;
  categoryFontSize?: 'medium' | 'large' | 'xl';
  categoryFontWeight?: 'normal' | 'bold' | 'black';
  categoryRowHeight?: 'small' | 'medium' | 'large';

  // Custom Theme Settings
  customBgColor?: string;
  customTextColor?: string;
  customAccentColor?: string;
  categoryGap?: 'small' | 'medium' | 'large';
  categoryOverlayOpacity?: number;
  categoryFontFamily?: string;
  categoryLetterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  categoryCharConvert?: boolean;

  menuTitleText?: string;

  // Product Styling
  productTitleColor?: string;
  productDescriptionColor?: string;
  productPriceColor?: string;
  productTitleSize?: 'medium' | 'large' | 'xl';
  productDescriptionSize?: 'small' | 'medium' | 'large';
  productPriceSize?: 'medium' | 'large' | 'xl';

  // Footer & Social
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialWhatsapp?: string;
  footerText?: string;
  footerCopyright?: string;
}

export const defaultSettings: SiteSettings = {
  themeColor: 'black',
  darkMode: false,
  bannerActive: false,
  bannerUrls: [],
  popupActive: false,
  popupUrl: '',
  logoUrl: '',
  logoWidth: 150,
  defaultProductImage: '',
  categoryFontSize: 'large',
  categoryFontWeight: 'black',
  categoryRowHeight: 'medium',
  categoryGap: 'medium',
  categoryOverlayOpacity: 50,
  categoryFontFamily: 'Inter',
  categoryLetterSpacing: 'normal',
  categoryCharConvert: false
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Popüler',
    nameEn: 'Popular',
    slug: 'populer',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    description: 'En çok tercih edilen lezzetler',
    order: 0
  },
  // ... keep minimal mock just in case
];

export const products: Product[] = [];


export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  price: number;
  quantity: number;
  options?: any;
  status: 'pending' | 'prepared' | 'served';
}

export interface Order {
  id: string;
  restaurant_id: string;
  table_no: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total_amount: number;
  final_amount?: number;
  is_paid?: boolean;
  customer_note?: string;
  created_at: string;
  items?: OrderItem[];
  payments?: Payment[];
}

export interface Payment {
  id: string;
  order_id: string;
  restaurant_id: string;
  amount: number;
  payment_method: 'cash' | 'credit_card' | 'meal_card' | 'other';
  discount_amount: number;
  created_at: string;
}

export interface Table {
  id: string;
  restaurant_id: string;
  table_no: string;
  qr_code_url?: string;
}
