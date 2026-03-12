import { Product, Category, SiteSettings, Restaurant } from './data';

// ─────────────────────────────────────────────────────────────────────────────
// Her demo kendi restoran kimliğine sahip (çakışmayı önlemek için)
// ─────────────────────────────────────────────────────────────────────────────

function makeRestaurant(themeId: string): Restaurant {
    return {
        id: `demo-${themeId}`,
        name: demoMeta[themeId]?.siteName || 'QRSaaS Demo',
        slug: `demo-${themeId}`,
        plan_type: 'PLUS',
        created_at: new Date().toISOString()
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 1: MINIMAL — "Tab Navigasyonu & Yerleşim Modları"
// Özellik: menuLayout=tabs, her kategoride farklı layout_mode
// ─────────────────────────────────────────────────────────────────────────────

const minimalCategories: Category[] = [
    {
        id: 'min-cat-1',
        restaurantId: 'demo-minimal',
        name: 'Kahvaltı',
        nameEn: 'Breakfast',
        order: 1,
        slug: 'kahvalti',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'min-cat-2',
        restaurantId: 'demo-minimal',
        name: 'Öğle Menüsü',
        nameEn: 'Lunch',
        order: 2,
        slug: 'ogle-menu',
        layout_mode: 'list',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'min-cat-3',
        restaurantId: 'demo-minimal',
        name: 'Atıştırmalık',
        nameEn: 'Snacks',
        order: 3,
        slug: 'atistirmalik',
        layout_mode: 'list-no-image',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'min-cat-4',
        restaurantId: 'demo-minimal',
        name: 'İçecekler',
        nameEn: 'Drinks',
        order: 4,
        slug: 'icecekler',
        layout_mode: 'list-no-image',
        segment: 'drink',
        station_name: 'Bar'
    }
];

const minimalProducts: Product[] = [
    // Kahvaltı — grid
    {
        id: 'min-p-1',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-1',
        name: 'Serpme Kahvaltı',
        nameEn: 'Turkish Spread Breakfast',
        description: 'Peynir çeşitleri, zeytin, bal, kaymak, domates ve salatalık ile.',
        descriptionEn: 'Assorted cheeses, olives, honey, cream, tomatoes and cucumber.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=500',
        allergens: ['milk', 'wheat'],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'min-p-2',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-1',
        name: 'Avokadolu Tost',
        nameEn: 'Avocado Toast',
        description: 'Ekşi maya ekmek, taze avokado, poşe yumurta, sumak.',
        descriptionEn: 'Sourdough bread, fresh avocado, poached egg, sumac.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?q=80&w=500',
        allergens: ['wheat'],
        tags: [{ id: 't1', name: 'Vegan', icon: 'leaf', color: '#16a34a' }],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'min-p-3',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-1',
        name: 'Granola Bowl',
        nameEn: 'Granola Bowl',
        description: 'Yoğurt, mevsim meyveleri, organik granola ve bal.',
        descriptionEn: 'Yogurt, seasonal fruits, organic granola and honey.',
        price: 195,
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=500',
        allergens: ['milk', 'wheat'],
        sortOrder: 3,
        isActive: true
    },
    // Öğle Menüsü — list
    {
        id: 'min-p-4',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-2',
        name: 'Günün Çorbası',
        nameEn: "Soup of the Day",
        description: 'Taze sebzelerle hazırlanan günlük çorba, ekmek ile.',
        descriptionEn: 'Daily soup prepared with fresh vegetables, served with bread.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'min-p-5',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-2',
        name: 'Izgara Tavuk Menü',
        nameEn: 'Grilled Chicken Set',
        description: 'Izgara tavuk göğsü, pilav, salata ve içecek dahil.',
        descriptionEn: 'Grilled chicken breast, rice, salad and drink included.',
        price: 380,
        discountPrice: 320,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500',
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'min-p-6',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-2',
        name: 'Vejetaryen Noodle',
        nameEn: 'Vegetarian Noodle',
        description: 'Soya sosu, taze sebzeler, susamlı erişteler.',
        descriptionEn: 'Soy sauce, fresh vegetables, sesame noodles.',
        price: 260,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500',
        tags: [{ id: 't2', name: 'Vejetaryen', icon: 'leaf', color: '#16a34a' }],
        sortOrder: 3,
        isActive: true
    },
    // Atıştırmalık — list-no-image
    {
        id: 'min-p-7',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-3',
        name: 'Patates Kızartması',
        nameEn: 'French Fries',
        description: 'Tuz, kekik ve özel sos ile.',
        descriptionEn: 'With salt, thyme and special sauce.',
        price: 95,
        image: '',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'min-p-8',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-3',
        name: 'Mozzarella Çubukları',
        nameEn: 'Mozzarella Sticks',
        description: 'Kızarmış mozzarella, domates sos.',
        descriptionEn: 'Fried mozzarella, tomato dipping sauce.',
        price: 140,
        image: '',
        allergens: ['milk', 'wheat'],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'min-p-9',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-3',
        name: 'Humus & Pide',
        nameEn: 'Hummus & Pita',
        description: 'Ev yapımı humus, ızgara pide.',
        descriptionEn: 'House-made hummus, grilled pita.',
        price: 110,
        image: '',
        sortOrder: 3,
        isActive: true
    },
    // İçecekler — list-no-image
    {
        id: 'min-p-10',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-4',
        name: 'Türk Kahvesi',
        nameEn: 'Turkish Coffee',
        description: '',
        descriptionEn: '',
        price: 65,
        image: '',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'min-p-11',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-4',
        name: 'Sıkma Portakal Suyu',
        nameEn: 'Fresh Orange Juice',
        description: '',
        descriptionEn: '',
        price: 90,
        image: '',
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'min-p-12',
        restaurantId: 'demo-minimal',
        categoryId: 'min-cat-4',
        name: 'Filtre Kahve',
        nameEn: 'Filter Coffee',
        description: '',
        descriptionEn: '',
        price: 75,
        image: '',
        sortOrder: 3,
        isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 2: ELEGANCE — "Banner & Tanıtım Sistemi (PRO)"
// Özellik: bannerActive + bannerOverlayVisible + bannerTitle/Tag + cards layout
// ─────────────────────────────────────────────────────────────────────────────

const eleganceCategories: Category[] = [
    {
        id: 'eleg-cat-1',
        restaurantId: 'demo-elegance',
        name: 'Başlangıçlar',
        nameEn: 'Starters',
        order: 1,
        slug: 'baslangiçlar',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'eleg-cat-2',
        restaurantId: 'demo-elegance',
        name: 'Ana Yemekler',
        nameEn: 'Main Courses',
        order: 2,
        slug: 'ana-yemekler',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'eleg-cat-3',
        restaurantId: 'demo-elegance',
        name: 'Tatlılar',
        nameEn: 'Desserts',
        order: 3,
        slug: 'tatlilar',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Tatlı'
    }
];

const eleganceProducts: Product[] = [
    // Başlangıçlar
    {
        id: 'eleg-p-1',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-1',
        name: 'Burrata & Domates',
        nameEn: 'Burrata & Heirloom Tomato',
        description: 'Taze burrata peyniri, panzanella domates, fesleğen yağı, deniz tuzu.',
        descriptionEn: 'Fresh burrata, panzanella tomatoes, basil oil, sea salt.',
        price: 380,
        image: 'https://images.unsplash.com/photo-1551183053-bf91798d832f?q=80&w=500',
        allergens: ['milk'],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'eleg-p-2',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-1',
        name: 'Karidesli Bruschetta',
        nameEn: 'Shrimp Bruschetta',
        description: 'Ekşi maya ekmek, limonlu karides, avokado krem, limon kabuğu.',
        descriptionEn: 'Sourdough toast, lemon shrimp, avocado cream, lemon zest.',
        price: 420,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500',
        allergens: ['wheat'],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'eleg-p-3',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-1',
        name: 'Foie Gras Terrine',
        nameEn: 'Foie Gras Terrine',
        description: 'Ördek ciğeri terrine, brioche, üzüm çerçisi ve turunçgil jeli.',
        descriptionEn: 'Duck liver terrine, brioche toast, grape chutney and citrus gel.',
        price: 680,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=500',
        allergens: ['wheat', 'milk'],
        badge: 'ŞEF ÖZEL',
        sortOrder: 3,
        isActive: true
    },
    // Ana Yemekler
    {
        id: 'eleg-p-4',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-2',
        name: 'Kuzu Pirzola',
        nameEn: 'Rack of Lamb',
        description: 'Fıstıklı kaplamalı kuzu pirzola, trüf patates püresi, kırmızı şarap sosu.',
        descriptionEn: 'Pistachio-crusted rack of lamb, truffle mashed potato, red wine jus.',
        price: 950,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=500',
        allergens: ['milk', 'wheat'],
        badge: 'ŞEF ÖZEL',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'eleg-p-5',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-2',
        name: 'Somon Fileto',
        nameEn: 'Salmon Fillet',
        description: 'Atlantik somonu, dereotlu hollandez, ıspanaklı risotto.',
        descriptionEn: 'Atlantic salmon, dill hollandaise, spinach risotto.',
        price: 780,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500',
        allergens: ['milk'],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'eleg-p-6',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-2',
        name: 'Wagyu Burger',
        nameEn: 'Wagyu Beef Burger',
        description: '200gr Wagyu köfte, trüf mayonezi, karamelize soğan, brioche.',
        descriptionEn: '200g Wagyu patty, truffle mayo, caramelized onions, brioche bun.',
        price: 1100,
        discountPrice: 890,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
        allergens: ['wheat', 'milk'],
        sortOrder: 3,
        isActive: true
    },
    // Tatlılar
    {
        id: 'eleg-p-7',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-3',
        name: 'Crème Brûlée',
        nameEn: 'Crème Brûlée',
        description: 'Klasik Fransız vanilyalı krema, karamelizasyonlu şeker kabuğu.',
        descriptionEn: 'Classic French vanilla custard with caramelized sugar crust.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=500',
        allergens: ['milk'],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'eleg-p-8',
        restaurantId: 'demo-elegance',
        categoryId: 'eleg-cat-3',
        name: 'Çikolatalı Fondü',
        nameEn: 'Chocolate Fondant',
        description: 'Sıcak çikolatalı kek, vanilya dondurma, taze çilek.',
        descriptionEn: 'Warm chocolate cake, vanilla ice cream, fresh strawberries.',
        price: 320,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=500',
        allergens: ['milk', 'wheat'],
        sortOrder: 2,
        isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 3: MODERN — "Ürün Özellikleri (İndirim, Alerjen, Varyant, Etiket)"
// Özellik: discountPrice, allergens, tags, variants, badge — hepsi grid'de görünür
// ─────────────────────────────────────────────────────────────────────────────

const modernCategories: Category[] = [
    {
        id: 'mod-cat-1',
        restaurantId: 'demo-modern',
        name: 'Burger & Wrap',
        nameEn: 'Burger & Wrap',
        order: 1,
        slug: 'burger-wrap',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'mod-cat-2',
        restaurantId: 'demo-modern',
        name: 'Salata & Bowl',
        nameEn: 'Salad & Bowl',
        order: 2,
        slug: 'salata-bowl',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'mod-cat-3',
        restaurantId: 'demo-modern',
        name: 'İçecekler',
        nameEn: 'Beverages',
        order: 3,
        slug: 'icecekler',
        layout_mode: 'grid',
        segment: 'drink',
        station_name: 'Bar'
    }
];

const modernProducts: Product[] = [
    // Burger & Wrap — tüm ürün özellikleri gösteriliyor
    {
        id: 'mod-p-1',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-1',
        name: 'Smash Burger',
        nameEn: 'Smash Burger',
        description: 'Çift smash köfte, amerikan peyniri, özel sos, turşu.',
        descriptionEn: 'Double smash patty, American cheese, secret sauce, pickles.',
        price: 450,
        discountPrice: 380,   // ← İNDİRİM ROZETİ
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
        allergens: ['wheat', 'milk'],  // ← ALERJEN
        badge: 'EN ÇOK SATAN',          // ← ROZET
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'mod-p-2',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-1',
        name: 'Vegan Wrap',
        nameEn: 'Vegan Wrap',
        description: 'Izgara sebze, humus, avokado, roka, tortilla.',
        descriptionEn: 'Grilled veggies, hummus, avocado, arugula, tortilla.',
        price: 320,
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=500',
        allergens: ['wheat'],
        tags: [                          // ← ETİKET
            { id: 'tmod1', name: 'Vegan', icon: 'leaf', color: '#16a34a' },
        ],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'mod-p-3',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-1',
        name: 'Crispy Chicken Burger',
        nameEn: 'Crispy Chicken Burger',
        description: 'Çıtır tavuk, coleslaw, sriracha mayo, brioche.',
        descriptionEn: 'Crispy chicken, coleslaw, sriracha mayo, brioche bun.',
        price: 420,
        discountPrice: 360,   // ← İNDİRİM
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=500',
        allergens: ['wheat', 'milk'],
        tags: [
            { id: 'tmod2', name: 'Acı', icon: 'pepper', color: '#dc2626' }
        ],
        sortOrder: 3,
        isActive: true
    },
    // Salata & Bowl
    {
        id: 'mod-p-4',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-2',
        name: 'Caesar Salad',
        nameEn: 'Caesar Salad',
        description: 'Romaine marul, parmesan, kruton, caesar sos.',
        descriptionEn: 'Romaine lettuce, parmesan, croutons, caesar dressing.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500',
        allergens: ['milk', 'wheat'],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'mod-p-5',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-2',
        name: 'Protein Power Bowl',
        nameEn: 'Protein Power Bowl',
        description: 'Kinoa, ızgara tavuk, edamame, avokado, tahin sos.',
        descriptionEn: 'Quinoa, grilled chicken, edamame, avocado, tahini dressing.',
        price: 360,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500',
        tags: [
            { id: 'tmod3', name: 'Yüksek Protein', icon: 'pepper', color: '#2563eb' },
            { id: 'tmod4', name: 'Gluten Free', icon: 'leaf', color: '#16a34a' }
        ],
        badge: 'SAĞLIKLI SEÇİM',
        sortOrder: 2,
        isActive: true
    },
    // İçecekler — varyantlar
    {
        id: 'mod-p-6',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-3',
        name: 'Iced Latte',
        nameEn: 'Iced Latte',
        description: 'Espresso, süt, buz.',
        descriptionEn: 'Espresso, milk, ice.',
        price: null,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500',
        allergens: ['milk'],
        variants: [                      // ← VARYANTlar
            { name: 'Small (250ml)', price: 110 },
            { name: 'Medium (350ml)', price: 145 },
            { name: 'Large (500ml)', price: 175 }
        ],
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'mod-p-7',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-3',
        name: 'Matcha Latte',
        nameEn: 'Matcha Latte',
        description: 'Saf Japon matcha tozu, bademli süt.',
        descriptionEn: 'Pure Japanese matcha powder, almond milk.',
        price: null,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=500',
        tags: [{ id: 'tmod5', name: 'Bitkisel', icon: 'leaf', color: '#16a34a' }],
        variants: [
            { name: 'Hot', price: 130 },
            { name: 'Iced', price: 150 }
        ],
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'mod-p-8',
        restaurantId: 'demo-modern',
        categoryId: 'mod-cat-3',
        name: 'Taze Meyve Suyu',
        nameEn: 'Fresh Juice',
        description: '',
        descriptionEn: '',
        price: 95,
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=500',
        sortOrder: 3,
        isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 4: VIBRANT — "Masonry Layout & Çoklu Kategori"
// Özellik: masonry layout, çok ürün, segment ayrımı, renkli atmosfer
// ─────────────────────────────────────────────────────────────────────────────

const vibrantCategories: Category[] = [
    {
        id: 'vib-cat-1',
        restaurantId: 'demo-vibrant',
        name: 'Pizza',
        nameEn: 'Pizza',
        order: 1,
        slug: 'pizza',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Fırın'
    },
    {
        id: 'vib-cat-2',
        restaurantId: 'demo-vibrant',
        name: 'Makarna & Risotto',
        nameEn: 'Pasta & Risotto',
        order: 2,
        slug: 'makarna-risotto',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Mutfak'
    },
    {
        id: 'vib-cat-3',
        restaurantId: 'demo-vibrant',
        name: 'Tatlılar',
        nameEn: 'Desserts',
        order: 3,
        slug: 'tatlilar',
        layout_mode: 'grid',
        segment: 'food',
        station_name: 'Tatlı'
    },
    {
        id: 'vib-cat-4',
        restaurantId: 'demo-vibrant',
        name: 'İçecekler',
        nameEn: 'Beverages',
        order: 4,
        slug: 'icecekler',
        layout_mode: 'grid',
        segment: 'drink',
        station_name: 'Bar'
    }
];

const vibrantProducts: Product[] = [
    // Pizza
    {
        id: 'vib-p-1', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-1',
        name: 'Margherita', nameEn: 'Margherita',
        description: 'San Marzano domates, fior di latte mozzarella, taze fesleğen.',
        descriptionEn: 'San Marzano tomato, fior di latte mozzarella, fresh basil.',
        price: 320, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500',
        allergens: ['wheat', 'milk'], sortOrder: 1, isActive: true
    },
    {
        id: 'vib-p-2', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-1',
        name: 'Diavola', nameEn: 'Diavola',
        description: 'Salam, acı biber, karamelize soğan, mozarella.',
        descriptionEn: 'Salami, chili peppers, caramelized onions, mozzarella.',
        price: 380, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500',
        allergens: ['wheat', 'milk'],
        tags: [{ id: 'tv1', name: 'Acı', icon: 'pepper', color: '#dc2626' }],
        badge: 'POPÜLER',
        sortOrder: 2, isActive: true
    },
    {
        id: 'vib-p-3', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-1',
        name: 'Quattro Formaggi', nameEn: 'Four Cheese',
        description: 'Mozzarella, gorgonzola, parmesan, ricotta.',
        descriptionEn: 'Mozzarella, gorgonzola, parmesan, ricotta.',
        price: 420, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500',
        allergens: ['wheat', 'milk'], sortOrder: 3, isActive: true
    },
    {
        id: 'vib-p-4', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-1',
        name: 'Tartufo', nameEn: 'Truffle Pizza',
        description: 'Trüf kreması, mantar, parmesan, roka.',
        descriptionEn: 'Truffle cream, mushroom, parmesan, arugula.',
        price: 520, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=500',
        allergens: ['wheat', 'milk'], badge: 'ŞEF ÖZEL', sortOrder: 4, isActive: true
    },
    // Makarna
    {
        id: 'vib-p-5', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-2',
        name: 'Carbonara', nameEn: 'Carbonara',
        description: 'Spaghetti, guanciale, yumurta sarısı, pecorino, karabiber.',
        descriptionEn: 'Spaghetti, guanciale, egg yolk, pecorino, black pepper.',
        price: 360, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=500',
        allergens: ['wheat', 'milk'], sortOrder: 1, isActive: true
    },
    {
        id: 'vib-p-6', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-2',
        name: 'Pesto Genovese', nameEn: 'Pesto Pasta',
        description: 'Taze fesleğen pesto, kiraz domates, parmesan.',
        descriptionEn: 'Fresh basil pesto, cherry tomatoes, parmesan.',
        price: 320, discountPrice: 270,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=500',
        allergens: ['wheat', 'milk'],
        tags: [{ id: 'tv2', name: 'Vejetaryen', icon: 'leaf', color: '#16a34a' }],
        sortOrder: 2, isActive: true
    },
    {
        id: 'vib-p-7', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-2',
        name: 'Risotto ai Funghi', nameEn: 'Mushroom Risotto',
        description: 'Kemer pirinci, karışık mantar, parmesan, trüf yağı.',
        descriptionEn: 'Arborio rice, mixed mushrooms, parmesan, truffle oil.',
        price: 440, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=500',
        allergens: ['milk'], sortOrder: 3, isActive: true
    },
    // Tatlılar
    {
        id: 'vib-p-8', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-3',
        name: 'Tiramisu', nameEn: 'Tiramisu',
        description: 'Ladyfinger bisküvi, mascarpone, espresso, kakao.',
        descriptionEn: 'Ladyfinger biscuit, mascarpone, espresso, cocoa.',
        price: 240, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500',
        allergens: ['milk', 'wheat'], sortOrder: 1, isActive: true
    },
    {
        id: 'vib-p-9', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-3',
        name: 'Panna Cotta', nameEn: 'Panna Cotta',
        description: 'Vanilya kreması, çilek coulis, taze nane.',
        descriptionEn: 'Vanilla cream, strawberry coulis, fresh mint.',
        price: 200, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500',
        allergens: ['milk'], sortOrder: 2, isActive: true
    },
    // İçecekler
    {
        id: 'vib-p-10', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-4',
        name: 'Limonata', nameEn: 'Fresh Lemonade',
        description: 'Taze sıkılmış limon, nane, soda.',
        descriptionEn: 'Freshly squeezed lemon, mint, soda.',
        price: 95, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=500',
        sortOrder: 1, isActive: true
    },
    {
        id: 'vib-p-11', restaurantId: 'demo-vibrant', categoryId: 'vib-cat-4',
        name: 'San Pellegrino', nameEn: 'San Pellegrino',
        description: 'Maden suyu 500ml',
        descriptionEn: 'Sparkling water 500ml',
        price: 65, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500',
        sortOrder: 2, isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 5: NEON — "Bar & Gece Menüsü"
// Özellik: Koyu tema, kokteyl listesi, neon görsellik, list-no-image + masonry
// ─────────────────────────────────────────────────────────────────────────────

const neonCategories: Category[] = [
    {
        id: 'neon-cat-1',
        restaurantId: 'demo-neon',
        name: 'Signature Kokteyller',
        nameEn: 'Signature Cocktails',
        order: 1,
        slug: 'signature-cocktails',
        layout_mode: 'grid',
        segment: 'drink',
        station_name: 'Bar'
    },
    {
        id: 'neon-cat-2',
        restaurantId: 'demo-neon',
        name: 'Shot & Short',
        nameEn: 'Shots & Shorts',
        order: 2,
        slug: 'shots-shorts',
        layout_mode: 'list-no-image',
        segment: 'drink',
        station_name: 'Bar'
    },
    {
        id: 'neon-cat-3',
        restaurantId: 'demo-neon',
        name: 'Bar Atıştırmalıkları',
        nameEn: 'Bar Bites',
        order: 3,
        slug: 'bar-bites',
        layout_mode: 'list',
        segment: 'food',
        station_name: 'Mutfak'
    }
];

const neonProducts: Product[] = [
    // Kokteyller
    {
        id: 'neon-p-1', restaurantId: 'demo-neon', categoryId: 'neon-cat-1',
        name: 'Purple Haze', nameEn: 'Purple Haze',
        description: 'Vodka, krem de violette, limon suyu, kelebek bezelyesi çayı.',
        descriptionEn: 'Vodka, crème de violette, lemon juice, butterfly pea tea.',
        price: 280, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=500',
        badge: 'SİGNATURE', sortOrder: 1, isActive: true
    },
    {
        id: 'neon-p-2', restaurantId: 'demo-neon', categoryId: 'neon-cat-1',
        name: 'Neon Mule', nameEn: 'Neon Mule',
        description: 'Vodka, zencefil birası, limon, neon ice.',
        descriptionEn: 'Vodka, ginger beer, lime, glowing neon ice.',
        price: 260, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=500',
        sortOrder: 2, isActive: true
    },
    {
        id: 'neon-p-3', restaurantId: 'demo-neon', categoryId: 'neon-cat-1',
        name: 'Cyberpunk Sour', nameEn: 'Cyberpunk Sour',
        description: 'Whiskey, aquafaba, limon suyu, şeker şurubu, angostura.',
        descriptionEn: 'Whiskey, aquafaba, lemon juice, simple syrup, angostura.',
        price: 300, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?q=80&w=500',
        badge: 'YENİ',
        tags: [{ id: 'tn1', name: 'Alkollü', icon: 'pepper', color: '#a855f7' }],
        sortOrder: 3, isActive: true
    },
    {
        id: 'neon-p-4', restaurantId: 'demo-neon', categoryId: 'neon-cat-1',
        name: 'Frozen Margarita', nameEn: 'Frozen Margarita',
        description: 'Tequila, triple sec, limon, buz ile harmanlanmış.',
        descriptionEn: 'Tequila, triple sec, lime, blended with ice.',
        price: 270, image: 'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?q=80&w=500',
        sortOrder: 4, isActive: true
    },
    // Shot & Short — list-no-image
    {
        id: 'neon-p-5', restaurantId: 'demo-neon', categoryId: 'neon-cat-2',
        name: 'Tequila Shot', nameEn: 'Tequila Shot',
        description: 'Tuz ve limon ile.',
        descriptionEn: 'With salt and lime.',
        price: 120, image: '', sortOrder: 1, isActive: true
    },
    {
        id: 'neon-p-6', restaurantId: 'demo-neon', categoryId: 'neon-cat-2',
        name: 'Jaeger Bomb', nameEn: 'Jaeger Bomb',
        description: 'Jaegermeister & enerji içeceği.',
        descriptionEn: 'Jaegermeister & energy drink.',
        price: 160, image: '', sortOrder: 2, isActive: true
    },
    {
        id: 'neon-p-7', restaurantId: 'demo-neon', categoryId: 'neon-cat-2',
        name: 'B52', nameEn: 'B52',
        description: 'Kahlua, Baileys, Grand Marnier.',
        descriptionEn: 'Kahlua, Baileys, Grand Marnier.',
        price: 145, image: '', sortOrder: 3, isActive: true
    },
    {
        id: 'neon-p-8', restaurantId: 'demo-neon', categoryId: 'neon-cat-2',
        name: 'Sambuca Shot', nameEn: 'Sambuca Shot',
        description: '3 kahve çekirdeği ile servis edilir.',
        descriptionEn: 'Served with 3 coffee beans.',
        price: 110, image: '', sortOrder: 4, isActive: true
    },
    // Bar Atıştırmalıkları
    {
        id: 'neon-p-9', restaurantId: 'demo-neon', categoryId: 'neon-cat-3',
        name: 'Çıtır Kalamari', nameEn: 'Crispy Calamari',
        description: 'Aioli sos ile servis edilir.',
        descriptionEn: 'Served with aioli sauce.',
        price: 220, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=500',
        sortOrder: 1, isActive: true
    },
    {
        id: 'neon-p-10', restaurantId: 'demo-neon', categoryId: 'neon-cat-3',
        name: 'Nachos & Salsa', nameEn: 'Nachos & Salsa',
        description: 'Cheddar, jalapeño, guacamole, sour cream.',
        descriptionEn: 'Cheddar, jalapeño, guacamole, sour cream.',
        price: 185, image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=500',
        allergens: ['milk', 'wheat'], sortOrder: 2, isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO 6: RUSTIC — "İçecek Varyantları (Kadeh / Şişe)"
// Özellik: list layout + product variants + şarap/bira menüsü
// ─────────────────────────────────────────────────────────────────────────────

const rusticCategories: Category[] = [
    {
        id: 'rus-cat-1',
        restaurantId: 'demo-rustic',
        name: 'Şaraplar',
        nameEn: 'Wines',
        order: 1,
        slug: 'saraplar',
        layout_mode: 'list',
        segment: 'drink',
        station_name: 'Bar'
    },
    {
        id: 'rus-cat-2',
        restaurantId: 'demo-rustic',
        name: 'Gin & Viski',
        nameEn: 'Gin & Whiskey',
        order: 2,
        slug: 'gin-viski',
        layout_mode: 'list',
        segment: 'drink',
        station_name: 'Bar'
    },
    {
        id: 'rus-cat-3',
        restaurantId: 'demo-rustic',
        name: 'Bira & Sider',
        nameEn: 'Beer & Cider',
        order: 3,
        slug: 'bira-sider',
        layout_mode: 'list-no-image',
        segment: 'drink',
        station_name: 'Bar'
    },
    {
        id: 'rus-cat-4',
        restaurantId: 'demo-rustic',
        name: 'Sıcak İçecekler',
        nameEn: 'Hot Drinks',
        order: 4,
        slug: 'sicak-icecekler',
        layout_mode: 'list-no-image',
        segment: 'drink',
        station_name: 'Bar'
    }
];

const rusticProducts: Product[] = [
    // Şaraplar — VARYANTLAR ile
    {
        id: 'rus-p-1', restaurantId: 'demo-rustic', categoryId: 'rus-cat-1',
        name: 'Kavaklidere Eğri Bağ Kırmızı', nameEn: 'Kavaklidere Eğri Bağ Red',
        description: 'Kalecik Karası & Öküzgözü. Vişne, kuru çiçek, baharatlı bitiş.',
        descriptionEn: 'Kalecik Karası & Öküzgözü. Cherry, dried flowers, spicy finish.',
        price: null, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500',
        variants: [
            { name: 'Kadeh', price: 180 },
            { name: 'Yarım Şişe', price: 480 },
            { name: 'Şişe', price: 860 }
        ],
        sortOrder: 1, isActive: true
    },
    {
        id: 'rus-p-2', restaurantId: 'demo-rustic', categoryId: 'rus-cat-1',
        name: 'Pamukkale Narince Beyaz', nameEn: 'Pamukkale Narince White',
        description: 'Narince üzümü. Elma, armut, hafif asidik yapı.',
        descriptionEn: 'Narince grape. Apple, pear, slightly acidic structure.',
        price: null, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=500',
        variants: [
            { name: 'Kadeh', price: 160 },
            { name: 'Yarım Şişe', price: 420 },
            { name: 'Şişe', price: 780 }
        ],
        sortOrder: 2, isActive: true
    },
    {
        id: 'rus-p-3', restaurantId: 'demo-rustic', categoryId: 'rus-cat-1',
        name: 'Büyülübağ Fumé Blanc', nameEn: 'Büyülübağ Fumé Blanc',
        description: 'Sauvignon Blanc. Greyfurt, ot, kaya minerali.',
        descriptionEn: 'Sauvignon Blanc. Grapefruit, grass, mineral notes.',
        price: null, image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=500',
        variants: [
            { name: 'Kadeh', price: 210 },
            { name: 'Şişe', price: 980 }
        ],
        badge: 'ÖZEL',
        sortOrder: 3, isActive: true
    },
    // Gin & Viski
    {
        id: 'rus-p-4', restaurantId: 'demo-rustic', categoryId: 'rus-cat-2',
        name: 'Hendricks Gin', nameEn: 'Hendricks Gin',
        description: 'Salatalık ve gül ile aşılanmış İskoç gini.',
        descriptionEn: 'Scottish gin infused with cucumber and rose.',
        price: null, image: 'https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?q=80&w=500',
        variants: [
            { name: 'Tek (50ml)', price: 220 },
            { name: 'Çift (100ml)', price: 390 }
        ],
        sortOrder: 1, isActive: true
    },
    {
        id: 'rus-p-5', restaurantId: 'demo-rustic', categoryId: 'rus-cat-2',
        name: 'Glenfiddich 12', nameEn: 'Glenfiddich 12 Year',
        description: 'Tek malt İskoç viskisi, 12 yıl olgunlaşmış.',
        descriptionEn: 'Single malt Scotch whiskey, aged 12 years.',
        price: null, image: 'https://images.unsplash.com/photo-1550985543-49bee3167284?q=80&w=500',
        variants: [
            { name: 'Tek (50ml)', price: 350 },
            { name: 'Çift (100ml)', price: 620 }
        ],
        badge: 'PREMIUM',
        sortOrder: 2, isActive: true
    },
    // Bira — list-no-image
    {
        id: 'rus-p-6', restaurantId: 'demo-rustic', categoryId: 'rus-cat-3',
        name: 'Efes Pilsener', nameEn: 'Efes Pilsener',
        description: '',
        descriptionEn: '',
        price: null, image: '',
        variants: [
            { name: 'Küçük (33cl)', price: 90 },
            { name: 'Büyük (50cl)', price: 130 }
        ],
        sortOrder: 1, isActive: true
    },
    {
        id: 'rus-p-7', restaurantId: 'demo-rustic', categoryId: 'rus-cat-3',
        name: 'Erdinger Weißbier', nameEn: 'Erdinger Weißbier',
        description: 'Alman buğday birası.',
        descriptionEn: 'German wheat beer.',
        price: null, image: '',
        variants: [
            { name: 'Küçük (33cl)', price: 140 },
            { name: 'Büyük (50cl)', price: 200 }
        ],
        sortOrder: 2, isActive: true
    },
    {
        id: 'rus-p-8', restaurantId: 'demo-rustic', categoryId: 'rus-cat-3',
        name: 'Magners Elma Sideri', nameEn: "Magners Apple Cider",
        description: '',
        descriptionEn: '',
        price: 165, image: '',
        sortOrder: 3, isActive: true
    },
    // Sıcak İçecekler
    {
        id: 'rus-p-9', restaurantId: 'demo-rustic', categoryId: 'rus-cat-4',
        name: 'İrish Coffee', nameEn: 'Irish Coffee',
        description: 'Whiskey, sıcak kahve, şeker, kremşanti.',
        descriptionEn: 'Whiskey, hot coffee, sugar, whipped cream.',
        price: 220, image: '',
        allergens: ['milk'],
        sortOrder: 1, isActive: true
    },
    {
        id: 'rus-p-10', restaurantId: 'demo-rustic', categoryId: 'rus-cat-4',
        name: 'Bitki Çayı', nameEn: 'Herbal Tea',
        description: 'Kuşburnu, ıhlamur, nane — seçiminize göre.',
        descriptionEn: 'Rosehip, linden, mint — choose one.',
        price: 85, image: '',
        sortOrder: 2, isActive: true
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// Demo meta: site adı ve açıklaması
// ─────────────────────────────────────────────────────────────────────────────

const demoMeta: Record<string, { siteName: string; siteDescription: string }> = {
    minimal:  { siteName: 'Café Minimal', siteDescription: 'TAB NAVİGASYONU & YERLEŞİMLER' },
    elegance: { siteName: 'Maison Élégance', siteDescription: 'BANNER & GÖRSEL PAZARLAMA' },
    modern:   { siteName: 'ModernEats', siteDescription: 'ÜRÜN ÖZELLİKLERİ: İNDİRİM • ALERJEN • VARYANTlar' },
    vibrant:  { siteName: 'Trattoria Vibrant', siteDescription: 'MASONRY LAYOUT & ÇOK KATEGORİ' },
    neon:     { siteName: 'NEON BAR', siteDescription: 'BAR & GECE MENÜSÜ' },
    rustic:   { siteName: 'Rustic Cellar', siteDescription: 'İÇECEK VARYANTları: KADEH • ŞİŞE' }
};

// ─────────────────────────────────────────────────────────────────────────────
// Ana fonksiyon
// ─────────────────────────────────────────────────────────────────────────────

export function getDemoData(themeSlug: string) {
    const themeId = themeSlug.replace('demo-', '');
    const meta = demoMeta[themeId] || { siteName: 'QRSaaS Demo', siteDescription: 'DEMO' };

    // Her temaya özel kategori + ürün verisi
    const dataMap: Record<string, { categories: Category[]; products: Product[] }> = {
        minimal:  { categories: minimalCategories,  products: minimalProducts  },
        elegance: { categories: eleganceCategories, products: eleganceProducts },
        modern:   { categories: modernCategories,   products: modernProducts   },
        vibrant:  { categories: vibrantCategories,  products: vibrantProducts  },
        neon:     { categories: neonCategories,     products: neonProducts     },
        rustic:   { categories: rusticCategories,   products: rusticProducts   },
    };

    const { categories, products } = dataMap[themeId] || dataMap['modern'];

    // ── AYARLAR ──────────────────────────────────────────────────────────────
    const settingsMap: Record<string, SiteSettings> = {

        // DEMO 1: Tab navigasyonu gösterimi
        minimal: {
            restaurantId: 'demo-minimal',
            themeId: 'minimal',
            menuLayout: 'tabs',           // ← ANA ÖZELLİK: Tabs
            themeColor: 'black',
            darkMode: true,
            fontFamily: 'Montserrat',
            bannerActive: false,
            bannerUrls: [],
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'bold',
            categoryRowHeight: 'medium',
            productTitleColor: '#f4f4f5',
            productDescriptionColor: '#a1a1aa',
            productPriceColor: '#ffffff',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },

        // DEMO 2: Banner sistemi + cards layout
        elegance: {
            restaurantId: 'demo-elegance',
            themeId: 'elegance',
            menuLayout: 'cards',          // ← ANA ÖZELLİK: Cards layout
            themeColor: 'black',
            darkMode: true,
            fontFamily: 'Playfair Display',
            bannerActive: true,           // ← ANA ÖZELLİK: Banner aktif
            bannerUrls: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200'],
            mobileBannerUrls: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800'],
            bannerOverlayVisible: true,   // ← Overlay yazısı
            bannerTag: '✦ ÖZEL AKŞAM YEMEĞİ',
            bannerTitle: 'Gastronomik Bir Yolculuk',
            bannerSubtitle: 'Her tabak, bir sanat eseri.',
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'bold',
            categoryRowHeight: 'medium',
            productTitleColor: '#fff1f2',
            productDescriptionColor: '#fda4af',
            productPriceColor: '#fbbf24',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },

        // DEMO 3: Ürün özellikleri (indirim, alerjen, varyant, etiket, rozet)
        modern: {
            restaurantId: 'demo-modern',
            themeId: 'modern',
            menuLayout: 'grid',           // ← ANA ÖZELLİK: Grid + tüm ürün özellikleri
            themeColor: 'black',
            darkMode: true,
            fontFamily: 'Inter',
            bannerActive: false,
            bannerUrls: [],
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'bold',
            categoryRowHeight: 'medium',
            productTitleColor: '#f8fafc',
            productDescriptionColor: '#94a3b8',
            productPriceColor: '#38bdf8',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },

        // DEMO 4: Masonry layout + çok kategori
        vibrant: {
            restaurantId: 'demo-vibrant',
            themeId: 'vibrant',
            menuLayout: 'masonry',        // ← ANA ÖZELLİK: Masonry
            themeColor: 'orange',
            darkMode: false,
            fontFamily: 'Inter',
            bannerActive: true,
            bannerUrls: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200'],
            bannerOverlayVisible: true,
            bannerTag: 'KAMPANYA',
            bannerTitle: 'Hafta Sonu Özel Menüsü',
            bannerSubtitle: 'Seçili pizza ve makarnalarda %20 indirim!',
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'bold',
            categoryRowHeight: 'medium',
            productTitleColor: '#78350f',
            productDescriptionColor: '#92400e',
            productPriceColor: '#ea580c',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },

        // DEMO 5: Bar / gece menüsü
        neon: {
            restaurantId: 'demo-neon',
            themeId: 'neon',
            menuLayout: 'masonry',        // Masonry karanlık temada
            themeColor: 'black',
            darkMode: true,
            fontFamily: 'Inter',
            bannerActive: false,
            bannerUrls: [],
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'black',
            categoryRowHeight: 'medium',
            productTitleColor: '#fae8ff',
            productDescriptionColor: '#e879f9',
            productPriceColor: '#22d3ee',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },

        // DEMO 6: Varyant menüsü (şarap/içecek)
        rustic: {
            restaurantId: 'demo-rustic',
            themeId: 'rustic',
            menuLayout: 'list',           // ← ANA ÖZELLİK: List + varyantlar
            themeColor: 'black',
            darkMode: false,
            fontFamily: 'Playfair Display',
            bannerActive: false,
            bannerUrls: [],
            popupActive: false,
            popupUrl: '',
            logoUrl: '',
            logoWidth: 150,
            siteName: meta.siteName,
            siteDescription: meta.siteDescription,
            categoryFontSize: 'large',
            categoryFontWeight: 'bold',
            categoryRowHeight: 'medium',
            productTitleColor: '#4a3623',
            productDescriptionColor: '#8b5a2b',
            productPriceColor: '#c2410c',
            productTitleSize: 'large',
            productDescriptionSize: 'medium',
            productPriceSize: 'large',
        },
    };

    const settings = settingsMap[themeId] || settingsMap['modern'];

    return {
        restaurant: makeRestaurant(themeId),
        categories,
        products,
        settings
    };
}
