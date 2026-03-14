
import { db, storage } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc,
    orderBy,
    limit,
    serverTimestamp,
    setDoc,
    increment,
    writeBatch,
    getCountFromServer,
    Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Category, Product, SiteSettings, Restaurant, Order, OrderItem, WebsiteSettings } from './data';

// --- ANALYTICS TRACKING (Hit based) ---

export async function trackPageView(restaurantId: string) {
    const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

    return addDoc(collection(db, 'page_views'), {
        restaurant_id: restaurantId,
        user_agent: ua,
        device_type: isMobile ? 'mobile' : 'desktop',
        created_at: serverTimestamp()
    });
}

export async function trackProductView(restaurantId: string, productId: string) {
    return addDoc(collection(db, 'product_views'), {
        restaurant_id: restaurantId,
        product_id: productId,
        created_at: serverTimestamp()
    });
}

// --- RESTAURANT ---

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
    const q = query(collection(db, 'restaurants'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    return { id: docSnap.id, ...data, created_at: data.created_at?.toDate?.()?.toISOString() || null } as Restaurant;
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    return { id: docSnap.id, ...data, created_at: data?.created_at?.toDate?.()?.toISOString() || null } as Restaurant;
}

export async function getRestaurantByDomain(domain: string): Promise<{ restaurant: Restaurant, type: 'MENU' | 'WEBSITE' } | null> {
    // 1. Try Custom Domain (Priority: MENU)
    const qMenu = query(collection(db, 'restaurants'), where('custom_domain', '==', domain), limit(1));
    const menuSnapshot = await getDocs(qMenu);
    if (!menuSnapshot.empty) {
        const data = menuSnapshot.docs[0].data();
        return { restaurant: { id: menuSnapshot.docs[0].id, ...data, created_at: data.created_at?.toDate?.()?.toISOString() || null } as Restaurant, type: 'MENU' };
    }

    // 2. Try Website Domain (Priority: WEBSITE)
    const qWebsite = query(collection(db, 'restaurants'), where('website_domain', '==', domain), limit(1));
    const websiteSnapshot = await getDocs(qWebsite);
    if (!websiteSnapshot.empty) {
        const data = websiteSnapshot.docs[0].data();
        return { restaurant: { id: websiteSnapshot.docs[0].id, ...data, created_at: data.created_at?.toDate?.()?.toISOString() || null } as Restaurant, type: 'WEBSITE' };
    }

    return null;
}

export async function updateRestaurantPassword(restaurantId: string, newPassword: string) {
    await updateDoc(doc(db, 'restaurants', restaurantId), { password: newPassword });
}

export async function updateRestaurantDomain(restaurantId: string, domain: string) {
    let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').toLowerCase();
    await updateDoc(doc(db, 'restaurants', restaurantId), { custom_domain: cleanDomain || null });
}

export async function updateRestaurantWebsiteDomain(restaurantId: string, domain: string) {
    let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').toLowerCase();
    await updateDoc(doc(db, 'restaurants', restaurantId), { website_domain: cleanDomain || null });
}

export async function updateRestaurantWebsiteSettings(restaurantId: string, settings: WebsiteSettings) {
    await updateDoc(doc(db, 'restaurants', restaurantId), { website_settings: settings });
}

// --- SUPER ADMIN SERVICES ---

export async function getAllRestaurants() {
    const q = query(collection(db, 'restaurants'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export async function createRestaurant(name: string, slug: string, password: string, planType: 'BASIC' | 'PRO' | 'PLUS' = 'BASIC', email: string = '', customDomain: string = '', parentId: string | null = null) {
    // Attempt to create a Firebase Auth User before writing to Firestore
    if (email && password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("Firebase Auth Error:", error);
            // Optionally: if the email already exists, you can either stop the process or continue.
            // For a strict SaaS, you should probably throw an error so they know the email is used.
            if (error.code === 'auth/email-already-in-use') {
                throw new Error("Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi girin veya giriş yapın.");
            } else if (error.code === 'auth/weak-password') {
                throw new Error("Şifre en az 6 karakter olmalıdır.");
            } else {
                throw new Error("Kullanıcı oluşturulamadı. Lütfen bilgilerinizi kontrol edin.");
            }
        }
    }

    // 1. Get next sequential ID (Starts from 3000)
    const counterRef = doc(db, 'counters', 'restaurants');
    const counterSnap = await getDoc(counterRef);
    let nextId = 3001;

    if (!counterSnap.exists()) {
        await setDoc(counterRef, { lastId: 3001 });
    } else {
        nextId = (counterSnap.data().lastId || 3000) + 1;
        await updateDoc(counterRef, { lastId: nextId });
    }

    const restRef = await addDoc(collection(db, 'restaurants'), {
        name,
        slug,
        password,
        email,
        custom_domain: customDomain || null,
        plan_type: planType,
        parent_id: parentId,
        numeric_id: nextId,
        created_at: serverTimestamp()
    });

    // Create Default Settings
    await setDoc(doc(db, 'settings', restRef.id), {
        restaurant_id: restRef.id,
        theme_color: 'black',
        dark_mode: false,
        banner_active: true,
        banner_urls: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'],
        popup_active: false,
        logo_width: 150,
        default_product_image: ''
    });

    return { id: restRef.id, name, slug };
}

export async function deleteRestaurant(id: string) {
    // Manually delete related documents (optional, Firestore doesn't have cascade)
    // In production, use Cloud Functions or a recursive delete
    await deleteDoc(doc(db, 'settings', id));
    await deleteDoc(doc(db, 'restaurants', id));
}

// --- BRANCH MANAGEMENT ---

export async function getBranchesByParentId(parentId: string): Promise<Restaurant[]> {
    const q = query(collection(db, 'restaurants'), where('parent_id', '==', parentId), orderBy('created_at', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
}


export async function createBranch(name: string, slug: string, password: string, parentId: string) {
    return createRestaurant(name, slug, password, 'PLUS', parentId);
}

export async function updateRestaurantPlan(restaurantId: string, planType: 'BASIC' | 'PRO' | 'PLUS', expiresAt: string | null = null) {
    await updateDoc(doc(db, 'restaurants', restaurantId), {
        plan_type: planType,
        plan_expires_at: expiresAt
    });
}

export async function syncBranchData(sourceId: string, targetId: string) {

    // 1. Get Source Data
    const catsQ = query(collection(db, 'categories'), where('restaurant_id', '==', sourceId));
    const catsSnap = await getDocs(catsQ);

    const prodsQ = query(collection(db, 'products'), where('restaurant_id', '==', sourceId));
    const prodsSnap = await getDocs(prodsQ);

    const batch = writeBatch(db);

    // 2. Map Categories
    const idMap: Record<string, string> = {};
    for (const catDoc of catsSnap.docs) {
        const oldId = catDoc.id;
        const newCatRef = doc(collection(db, 'categories'));
        idMap[oldId] = newCatRef.id;
        batch.set(newCatRef, { ...catDoc.data(), restaurant_id: targetId, created_at: serverTimestamp() });
    }

    // 3. Products
    for (const prodDoc of prodsSnap.docs) {
        const data = prodDoc.data();
        const newProdRef = doc(collection(db, 'products'));
        batch.set(newProdRef, {
            ...data,
            restaurant_id: targetId,
            category_id: data.category_id ? idMap[data.category_id] : null,
            created_at: serverTimestamp()
        });
    }

    await batch.commit();
    return { success: true };
}

export async function syncAllBranchesData(parentId: string) {
    const branches = await getBranchesByParentId(parentId);
    for (const branch of branches) {
        await syncBranchData(parentId, branch.id);
    }
    return { success: true };
}

// --- ANALYTICS ---

export async function getAnalyticsSummary(restaurantId: string, period: 'today' | 'week' | 'month' | 'year' = 'month') {
    try {
        const now = new Date();
        let startDate = new Date();

        if (period === 'today') {
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'week') {
            startDate.setDate(now.getDate() - 7);
        } else if (period === 'month') {
            startDate.setDate(now.getDate() - 30);
        } else if (period === 'year') {
            startDate.setFullYear(now.getFullYear() - 1);
        }

        const startTimestamp = Timestamp.fromDate(startDate);

        // 1. Fetch Page Views
        const pageViewsQ = query(
            collection(db, 'page_views'),
            where('restaurant_id', '==', restaurantId),
            where('created_at', '>=', startTimestamp),
            orderBy('created_at', 'desc')
        );
        const pageViewsSnap = await getDocs(pageViewsQ);
        const pageViews = pageViewsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString()
        }));

        // 2. Fetch Product Views
        const productViewsQ = query(
            collection(db, 'product_views'),
            where('restaurant_id', '==', restaurantId),
            where('created_at', '>=', startTimestamp),
            orderBy('created_at', 'desc')
        );
        const productViewsSnap = await getDocs(productViewsQ);

        // 3. Fetch Products and Categories for Enrichment (Firestore doesn't join)
        const products = await getProducts(restaurantId);
        const categories = await getCategories(restaurantId);

        const productMap = new Map(products.map(p => [p.id, p]));
        const categoryMap = new Map(categories.map(c => [c.id, c]));

        const productViews = productViewsSnap.docs.map(doc => {
            const data = doc.data();
            const product = productMap.get(data.product_id);
            const category = product ? categoryMap.get(product.categoryId) : null;

            return {
                id: doc.id,
                ...data,
                created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
                // Mocking the Supabase nested structure the UI expects
                products: product ? {
                    name: product.name,
                    categories: category ? { name: category.name } : { name: 'Diğer' }
                } : null
            };
        });

        return {
            pageViews,
            productViews,
            totalHits: pageViews.length,
            totalProductViews: productViews.length
        };
    } catch (error) {
        console.error("Error fetching analytics summary:", error);
        return {
            pageViews: [],
            productViews: [],
            totalHits: 0,
            totalProductViews: 0
        };
    }
}

// --- CATEGORIES ---

export async function getCategories(restaurantId: string) {
    const q = query(collection(db, 'categories'), where('restaurant_id', '==', restaurantId), orderBy('sort_order', 'asc'));
    const snap = await getDocs(q);

    return snap.docs.map(doc => {
        const item = doc.data();
        return {
            id: doc.id,
            restaurantId: item.restaurant_id,
            name: item.name,
            nameEn: item.name_en,
            slug: item.slug,
            image: item.image,
            icon: item.icon,
            iconColor: item.icon_color,
            iconSize: item.icon_size,
            description: item.description,
            badge: item.badge,
            discountRate: item.discount_rate,
            parentId: item.parent_id,
            order: item.sort_order,
            layout_mode: item.layout_mode || 'grid',
            segment: item.segment || 'food',
            visibility_start_time: item.visibility_start_time,
            visibility_end_time: item.visibility_end_time,
            visibility_days: item.visibility_days || [],
            station_name: item.station_name || 'Mutfak'
        };
    }) as Category[];
}

export async function createCategory(category: Partial<Category>) {
    const dbData = {
        restaurant_id: category.restaurantId,
        name: category.name,
        name_en: category.nameEn,
        slug: category.slug,
        image: category.image,
        icon: category.icon,
        icon_color: category.iconColor,
        icon_size: category.iconSize,
        description: category.description,
        badge: category.badge,
        discount_rate: category.discountRate,
        sort_order: category.order || 0,
        layout_mode: category.layout_mode || 'grid',
        segment: category.segment || 'food',
        visibility_start_time: category.visibility_start_time,
        visibility_end_time: category.visibility_end_time,
        visibility_days: category.visibility_days || [],
        station_name: category.station_name || 'Mutfak',
        created_at: serverTimestamp()
    };

    // Remove undefined properties to prevent Firestore errors
    Object.keys(dbData).forEach(key => (dbData as any)[key] === undefined && delete (dbData as any)[key]);

    const docRef = await addDoc(collection(db, 'categories'), dbData);
    return { id: docRef.id, ...dbData };
}

export async function updateCategory(id: string, updates: Partial<Category>) {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.iconColor !== undefined) dbUpdates.icon_color = updates.iconColor;
    if (updates.iconSize !== undefined) dbUpdates.icon_size = updates.iconSize;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
    if (updates.discountRate !== undefined) dbUpdates.discount_rate = updates.discountRate;
    if (updates.order !== undefined) dbUpdates.sort_order = updates.order;
    if (updates.layout_mode !== undefined) dbUpdates.layout_mode = updates.layout_mode;
    if (updates.segment !== undefined) dbUpdates.segment = updates.segment;
    if (updates.station_name !== undefined) dbUpdates.station_name = updates.station_name;
    if (updates.visibility_start_time !== undefined) dbUpdates.visibility_start_time = updates.visibility_start_time;
    if (updates.visibility_end_time !== undefined) dbUpdates.visibility_end_time = updates.visibility_end_time;
    if (updates.visibility_days !== undefined) dbUpdates.visibility_days = updates.visibility_days;

    await updateDoc(doc(db, 'categories', id), dbUpdates);
}

export async function deleteCategory(id: string) {
    await deleteDoc(doc(db, 'categories', id));
}

// --- PRODUCTS ---

export async function getProducts(restaurantId: string) {
    const q = query(collection(db, 'products'), where('restaurant_id', '==', restaurantId), orderBy('sort_order', 'asc'));
    const snap = await getDocs(q);

    return snap.docs.map(doc => {
        const item = doc.data();
        return {
            id: doc.id,
            restaurantId: item.restaurant_id,
            name: item.name,
            nameEn: item.name_en,
            description: item.description,
            descriptionEn: item.description_en,
            price: item.price,
            discountPrice: item.discount_price,
            image: item.image,
            categoryId: item.category_id,
            badge: item.badge,
            tags: item.tags || [],
            allergens: item.allergens || [],
            variants: item.variants || [],
            isActive: item.is_active,
            sortOrder: item.sort_order
        };
    }) as Product[];
}

export async function createProduct(product: Partial<Product>) {
    const dbData = {
        restaurant_id: product.restaurantId,
        name: product.name,
        name_en: product.nameEn,
        description: product.description,
        description_en: product.descriptionEn,
        price: product.price,
        discount_price: product.discountPrice,
        image: product.image,
        category_id: product.categoryId,
        badge: product.badge,
        tags: product.tags,
        allergens: product.allergens,
        variants: product.variants,
        is_active: product.isActive,
        sort_order: product.sortOrder || 0,
        created_at: serverTimestamp()
    };

    // Remove undefined properties to prevent Firestore errors
    Object.keys(dbData).forEach(key => (dbData as any)[key] === undefined && delete (dbData as any)[key]);

    const docRef = await addDoc(collection(db, 'products'), dbData);
    return { id: docRef.id, ...dbData };
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.descriptionEn !== undefined) dbUpdates.description_en = updates.descriptionEn;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.discountPrice !== undefined) dbUpdates.discount_price = updates.discountPrice;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.categoryId !== undefined) dbUpdates.category_id = updates.categoryId;
    if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
    if (updates.allergens !== undefined) dbUpdates.allergens = updates.allergens;
    if (updates.variants !== undefined) dbUpdates.variants = updates.variants;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
    if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;

    await updateDoc(doc(db, 'products', id), dbUpdates);
}

export async function deleteProduct(id: string) {
    await deleteDoc(doc(db, 'products', id));
}

// --- SETTINGS ---

export async function getSettings(restaurantId: string) {
    const docSnap = await getDoc(doc(db, 'settings', restaurantId));
    if (!docSnap.exists()) return null;
    const data = docSnap.data();

    return {
        id: docSnap.id,
        restaurantId: data.restaurant_id,
        themeId: data.theme_id || 'default',
        menuLayout: data.menu_layout || 'accordion',
        themeColor: data.theme_color,
        fontFamily: data.font_family || 'Inter',
        darkMode: data.dark_mode,
        bannerActive: data.banner_active,
        bannerUrls: data.banner_urls || [],
        mobileBannerUrls: data.mobile_banner_urls || [],
        bannerOverlayVisible: data.banner_overlay_visible !== false,
        bannerTag: data.banner_tag || 'FIRSAT',
        bannerTitle: data.banner_title || 'Kampanya',
        bannerSubtitle: data.banner_subtitle || '%20 İndirim',
        popupActive: data.popup_active,
        popupUrl: data.popup_url,
        logoUrl: data.logo_url,
        logoWidth: data.logo_width || 150,
        siteName: data.site_name,
        siteDescription: data.site_description,
        menuTitleText: data.menu_title_text,
        storeActive: data.store_active !== false, // default is true
        defaultProductImage: data.default_product_image,
        categoryFontSize: data.category_font_size || 'large',
        categoryFontWeight: data.category_font_weight || 'black',
        categoryRowHeight: data.category_row_height || 'medium',
        categoryGap: data.category_gap || 'medium',
        categoryOverlayOpacity: data.category_overlay_opacity ?? 50,
        categoryFontFamily: data.category_font_family || 'Inter',
        categoryLetterSpacing: data.category_letter_spacing || 'normal',
        categoryCharConvert: data.category_char_convert || false,
        customBgColor: data.custom_bg_color || '',
        customTextColor: data.custom_text_color || '',
        customAccentColor: data.custom_accent_color || '',
        productTitleSize: data.product_title_size || 'large',
        productDescriptionSize: data.product_description_size || 'medium',
        productPriceSize: data.product_price_size || 'large',
        socialInstagram: data.social_instagram,
        socialFacebook: data.social_facebook,
        socialTwitter: data.social_twitter,
        socialWhatsapp: data.social_whatsapp,
        footerText: data.footer_text,
        footerCopyright: data.footer_copyright
    } as SiteSettings;
}

export async function updateSettings(restaurantId: string, settings: Partial<SiteSettings>) {
    const dbUpdates: any = {};
    if (settings.themeId !== undefined) dbUpdates.theme_id = settings.themeId;
    if (settings.menuLayout !== undefined) dbUpdates.menu_layout = settings.menuLayout;
    if (settings.themeColor !== undefined) dbUpdates.theme_color = settings.themeColor;
    if (settings.fontFamily !== undefined) dbUpdates.font_family = settings.fontFamily;
    if (settings.darkMode !== undefined) dbUpdates.dark_mode = settings.darkMode;
    if (settings.bannerActive !== undefined) dbUpdates.banner_active = settings.bannerActive;
    if (settings.bannerUrls !== undefined) dbUpdates.banner_urls = settings.bannerUrls || [];
    if (settings.mobileBannerUrls !== undefined) dbUpdates.mobile_banner_urls = settings.mobileBannerUrls || [];
    if (settings.bannerOverlayVisible !== undefined) dbUpdates.banner_overlay_visible = settings.bannerOverlayVisible;
    if (settings.bannerTag !== undefined) dbUpdates.banner_tag = settings.bannerTag;
    if (settings.bannerTitle !== undefined) dbUpdates.banner_title = settings.bannerTitle;
    if (settings.bannerSubtitle !== undefined) dbUpdates.banner_subtitle = settings.bannerSubtitle;
    if (settings.popupActive !== undefined) dbUpdates.popup_active = settings.popupActive;
    if (settings.popupUrl !== undefined) dbUpdates.popup_url = settings.popupUrl;
    if (settings.logoUrl !== undefined) dbUpdates.logo_url = settings.logoUrl;
    if (settings.logoWidth !== undefined) dbUpdates.logo_width = settings.logoWidth;
    if (settings.siteName !== undefined) dbUpdates.site_name = settings.siteName;
    if (settings.siteDescription !== undefined) dbUpdates.site_description = settings.siteDescription;
    if (settings.menuTitleText !== undefined) dbUpdates.menu_title_text = settings.menuTitleText;
    if (settings.storeActive !== undefined) dbUpdates.store_active = settings.storeActive;
    if (settings.defaultProductImage !== undefined) dbUpdates.default_product_image = settings.defaultProductImage;
    if (settings.categoryFontSize !== undefined) dbUpdates.category_font_size = settings.categoryFontSize;
    if (settings.categoryFontWeight !== undefined) dbUpdates.category_font_weight = settings.categoryFontWeight;
    if (settings.categoryRowHeight !== undefined) dbUpdates.category_row_height = settings.categoryRowHeight;
    if (settings.categoryGap !== undefined) dbUpdates.category_gap = settings.categoryGap;
    if (settings.categoryOverlayOpacity !== undefined) dbUpdates.category_overlay_opacity = settings.categoryOverlayOpacity;
    if (settings.categoryFontFamily !== undefined) dbUpdates.category_font_family = settings.categoryFontFamily;
    if (settings.categoryLetterSpacing !== undefined) dbUpdates.category_letter_spacing = settings.categoryLetterSpacing;
    if (settings.categoryCharConvert !== undefined) dbUpdates.category_char_convert = settings.categoryCharConvert;
    if (settings.productTitleSize !== undefined) dbUpdates.product_title_size = settings.productTitleSize;
    if (settings.productDescriptionSize !== undefined) dbUpdates.product_description_size = settings.productDescriptionSize;
    if (settings.productPriceSize !== undefined) dbUpdates.product_price_size = settings.productPriceSize;
    if (settings.socialInstagram !== undefined) dbUpdates.social_instagram = settings.socialInstagram;
    if (settings.socialFacebook !== undefined) dbUpdates.social_facebook = settings.socialFacebook;
    if (settings.socialTwitter !== undefined) dbUpdates.social_twitter = settings.socialTwitter;
    if (settings.socialWhatsapp !== undefined) dbUpdates.social_whatsapp = settings.socialWhatsapp;
    if (settings.footerText !== undefined) dbUpdates.footer_text = settings.footerText;
    if (settings.footerCopyright !== undefined) dbUpdates.footer_copyright = settings.footerCopyright;
    if (settings.customBgColor !== undefined) dbUpdates.custom_bg_color = settings.customBgColor;
    if (settings.customTextColor !== undefined) dbUpdates.custom_text_color = settings.customTextColor;
    if (settings.customAccentColor !== undefined) dbUpdates.custom_accent_color = settings.customAccentColor;

    await updateDoc(doc(db, 'settings', restaurantId), dbUpdates);
}

// --- STORAGE ---

export async function uploadImage(file: File, path: string = 'images'): Promise<string> {
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

// --- ORDERS ---

export async function createOrder(restaurantId: string, tableNo: string, items: any[], customerNote?: string): Promise<Order | null> {
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderRef = await addDoc(collection(db, 'orders'), {
        restaurant_id: restaurantId,
        table_no: tableNo,
        total_amount: totalAmount,
        customer_note: customerNote,
        status: 'pending',
        created_at: serverTimestamp()
    });

    const batch = writeBatch(db);
    for (const item of items) {
        const itemRef = doc(collection(db, 'order_items'));
        batch.set(itemRef, {
            order_id: orderRef.id,
            product_id: item.product_id,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
            status: 'pending'
        });
    }
    await batch.commit();

    return { id: orderRef.id, restaurant_id: restaurantId, table_no: tableNo, total_amount: totalAmount, status: 'pending' } as any;
}

export async function getActiveOrders(restaurantId: string): Promise<Order[]> {
    const q = query(collection(db, 'orders'), where('restaurant_id', '==', restaurantId), where('status', 'in', ['pending', 'preparing', 'ready']), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
}

export async function updateOrderStatus(orderId: string, status: string) {
    await updateDoc(doc(db, 'orders', orderId), { status });
}

export async function updateRestaurantFeatures(restaurantId: string, features: { is_ordering_active?: boolean, is_waiter_mode_active?: boolean }) {
    await updateDoc(doc(db, 'restaurants', restaurantId), features);
}

export async function getDashboardStats(restaurantId: string) {
    try {
        // 1. Total Products Count
        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, where('restaurant_id', '==', restaurantId));
        const productsSnap = await getCountFromServer(productsQuery);
        const totalProducts = productsSnap.data().count;

        // 2. Today and Yesterday Views
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

        const viewsRef = collection(db, 'page_views');

        // Today
        const todayQuery = query(viewsRef,
            where('restaurant_id', '==', restaurantId),
            where('created_at', '>=', Timestamp.fromDate(todayStart))
        );
        const todaySnap = await getCountFromServer(todayQuery);

        // Yesterday
        const yesterdayQuery = query(viewsRef,
            where('restaurant_id', '==', restaurantId),
            where('created_at', '>=', Timestamp.fromDate(yesterdayStart)),
            where('created_at', '<', Timestamp.fromDate(todayStart))
        );
        const yesterdaySnap = await getCountFromServer(yesterdayQuery);

        return {
            todayViews: todaySnap.data().count,
            yesterdayViews: yesterdaySnap.data().count,
            totalProducts: totalProducts
        };
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return { todayViews: 0, yesterdayViews: 0, totalProducts: 0 };
    }
}

export async function updateOrderItemStatus(itemId: string, status: string) {
    await updateDoc(doc(db, 'order_items', itemId), { status });
}

export async function getActiveTableOrder(restaurantId: string, tableNo: string): Promise<Order | null> {
    const q = query(collection(db, 'orders'),
        where('restaurant_id', '==', restaurantId),
        where('table_no', '==', tableNo),
        where('status', 'in', ['pending', 'preparing', 'ready']),
        limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;

    const orderDoc = snap.docs[0];
    const orderData = orderDoc.data();

    // Fetch items
    const itemsQ = query(collection(db, 'order_items'), where('order_id', '==', orderDoc.id));
    const itemsSnap = await getDocs(itemsQ);
    const items = itemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { id: orderDoc.id, ...orderData, order_items: items } as any;
}

export async function processPayment(orderId: string, paymentMethod: string, amount: number, details: any = {}) {
    await addDoc(collection(db, 'payments'), {
        order_id: orderId,
        payment_method: paymentMethod,
        amount: amount,
        details: details,
        created_at: serverTimestamp()
    });

    await updateDoc(doc(db, 'orders', orderId), {
        status: 'completed',
        payment_status: 'paid'
    });
}

export async function addOrderItems(orderId: string, items: any[]) {
    const batch = writeBatch(db);
    let extraAmount = 0;

    for (const item of items) {
        const itemRef = doc(collection(db, 'order_items'));
        batch.set(itemRef, {
            order_id: orderId,
            product_id: item.product_id,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
            status: 'pending'
        });
        extraAmount += (item.price * item.quantity);
    }

    await batch.commit();

    // Update total
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
        total_amount: increment(extraAmount)
    });
}
