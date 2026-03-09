import { Product, Category, SiteSettings, Restaurant } from './data';

const demoRestaurant: Restaurant = {
    id: 'demo-rest-id',
    name: 'QRSaaS Demo Restoran',
    slug: 'demo',
    plan_type: 'PLUS',
    created_at: new Date().toISOString()
};

const demoCategories: Category[] = [
    {
        id: 'cat-1',
        restaurantId: 'demo-rest-id',
        name: 'Ana Yemekler',
        nameEn: 'Main Courses',
        order: 1,
        slug: 'ana-yemekler',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'cat-2',
        restaurantId: 'demo-rest-id',
        name: 'Tatlılar',
        nameEn: 'Desserts',
        order: 2,
        slug: 'tatlilar',
        layout_mode: 'list',
        segment: 'food',
        station_name: 'Tatlı'
    },
    {
        id: 'cat-3',
        restaurantId: 'demo-rest-id',
        name: 'İçecekler',
        nameEn: 'Beverages',
        order: 3,
        slug: 'icecekler',
        layout_mode: 'list-no-image',
        segment: 'drink',
        station_name: 'Bar'
    }
];

const demoProducts: Product[] = [
    {
        id: 'p-1',
        restaurantId: 'demo-rest-id',
        categoryId: 'cat-1',
        name: 'Truffle Mantarlı Penne',
        nameEn: 'Truffle Mushroom Penne',
        description: 'Özel krema sosu ve parmesan peyniri ile.',
        descriptionEn: 'With special cream sauce and parmesan.',
        price: 320,
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=500',
        allergens: ['milk', 'wheat'],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'p-2',
        restaurantId: 'demo-rest-id',
        categoryId: 'cat-1',
        name: 'Angus Burger',
        nameEn: 'Angus Burger',
        description: '180gr dana köfte, cheddar, karamelize soğan.',
        descriptionEn: '180g beef patty, cheddar, caramelized onions.',
        price: 450,
        discountPrice: 380,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
        allergens: ['wheat', 'session'],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'p-3',
        restaurantId: 'demo-rest-id',
        categoryId: 'cat-2',
        name: 'San Sebastian',
        nameEn: 'San Sebastian',
        description: 'Orijinal yanık İspanyol cheesecake.',
        descriptionEn: 'Original burnt Spanish cheesecake.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'p-4',
        restaurantId: 'demo-rest-id',
        categoryId: 'cat-3',
        name: 'Signature Latte',
        nameEn: 'Signature Latte',
        description: '',
        descriptionEn: '',
        price: 130,
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=500',
        sortOrder: 1,
        isActive: true
    }
];

export function getDemoData(themeSlug: string) {
    const themeId = themeSlug.replace('demo-', '');

    const settings: SiteSettings = {
        restaurantId: 'demo-rest-id',
        themeId: themeId as SiteSettings['themeId'],
        menuLayout: 'accordion',
        themeColor: 'black',
        popupActive: false,
        popupUrl: '',
        logoUrl: '',
        logoWidth: 150,
        fontFamily: themeId === 'elegance' ? 'Playfair Display' : (themeId === 'minimal' ? 'Montserrat' : 'Inter'),
        darkMode: ['minimal', 'elegance', 'modern', 'neon'].includes(themeId),
        bannerActive: true,
        bannerUrls: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200'],
        siteName: 'QR Demo Menü',
        siteDescription: `${themeId.toUpperCase()} TEMASI`,
        categoryFontSize: 'large',
        categoryFontWeight: 'bold',
        categoryRowHeight: 'medium',
        productTitleColor: ['minimal', 'elegance', 'modern', 'neon'].includes(themeId) ? '#ffffff' : '#111827',
        productDescriptionColor: ['minimal', 'elegance', 'modern', 'neon'].includes(themeId) ? '#9ca3af' : '#6b7280',
        productPriceColor: themeId === 'vibrant' ? '#d97706' : (['elegance'].includes(themeId) ? '#fbbf24' : '#10b981'),
        productTitleSize: 'large',
        productDescriptionSize: 'medium',
        productPriceSize: 'large',
    };

    return {
        restaurant: demoRestaurant,
        categories: demoCategories,
        products: demoProducts,
        settings
    };
}
